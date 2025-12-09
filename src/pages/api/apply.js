// pages/api/apply.js
import nodemailer from "nodemailer";
import { IncomingForm } from "formidable"; // Import the constructor directly
import fs from "fs";

// Disable Next.js body parsing so that formidable can handle incoming form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 465;
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: port,
  secure: port === 465, // use SSL for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ msg: "Form parsing error" });
    }

    // Normalize fields (Formidable sometimes returns arrays)
    const jobTitle = Array.isArray(fields.jobTitle) ? fields.jobTitle[0] : fields.jobTitle || "";
    const firstName = Array.isArray(fields.firstName) ? fields.firstName[0] : fields.firstName || "";
    const lastName = Array.isArray(fields.lastName) ? fields.lastName[0] : fields.lastName || "";
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email || "";
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone || "";

    // Build attachments from uploaded files
    const attachments = [];
    if (files && files.resume) {
      const resume = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      try {
        const fileData = fs.readFileSync(resume.filepath);
        attachments.push({
          filename: resume.originalFilename || resume.newFilename || "resume",
          content: fileData,
        });
      } catch (fsErr) {
        console.error("Failed to read uploaded file:", fsErr);
      }
    }

    const toAddress = process.env.EMAIL_TO || "piumalranepura@gmail.com";
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER || toAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `Application: ${jobTitle}`,
      text: `New Application\n\nJob: ${jobTitle}\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    if (attachments.length > 0) mailOptions.attachments = attachments;

    // Helper to attempt send using a transporter
    const trySendWithTransporter = async (transport) => {
      return transport.sendMail(mailOptions);
    };

    // Try to send with configured transporter first, with Ethereal fallback in dev
    try {
      try {
        const info = await trySendWithTransporter(transporter);
        console.log("Email sent:", info && info.messageId ? info.messageId : info);
        return res.status(200).json({ msg: "Sent successfully" });
      } catch (sendErr) {
        console.error("Email send fail:", sendErr);

        if (process.env.NODE_ENV !== "production") {
          try {
            const testAccount = await nodemailer.createTestAccount();
            const testTransporter = nodemailer.createTransport({
              host: testAccount.smtp.host,
              port: testAccount.smtp.port,
              secure: testAccount.smtp.secure,
              auth: {
                user: testAccount.user,
                pass: testAccount.pass,
              },
            });

            const info = await trySendWithTransporter(testTransporter);
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log("Ethereal preview URL:", previewUrl);
            return res.status(200).json({ msg: "Sent in dev (ethereal)", previewUrl });
          } catch (ethErr) {
            console.error("Ethereal send fail:", ethErr);
            return res.status(500).json({ msg: "Email send failed (dev fallback)" });
          }
        }

        return res.status(500).json({ msg: "Email send failed" });
      }
    } catch (error) {
      console.error("Unexpected error sending email:", error);
      return res.status(500).json({ msg: "Email send failed" });
    }
  });
}
