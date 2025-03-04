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

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL, // e.g. info@cleverproject.lk
    pass: process.env.ZOHO_PASSWORD, // e.g. your app-specific password if needed
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const form = new IncomingForm(); // Use the directly imported IncomingForm
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ msg: "Form parsing error" });
    }

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    const { jobTitle, firstName, lastName, email, phone } = fields;
    if (!jobTitle || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    let attachment = null;
    if (files.resume) {
      // If multiple files, pick the first one
      const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      const filePath = resumeFile.filepath || resumeFile.path;
      if (filePath) {
        try {
          const fileData = fs.readFileSync(filePath);
          attachment = {
            filename: resumeFile.originalFilename,
            content: fileData,
          };
        } catch (readErr) {
          console.error("Error reading file:", readErr);
        }
      } else {
        console.error("Resume file uploaded but no filepath found");
      }
    }

    try {
      await transporter.sendMail({
        from: `"${firstName} ${lastName}" <${process.env.ZOHO_EMAIL}>`,
        replyTo: email,
        to: process.env.ZOHO_EMAIL,
        subject: `Job Application for ${jobTitle} from ${firstName} ${lastName}`,
        text: `You received a new job application for ${jobTitle}.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
        attachments: attachment ? [attachment] : [],
      });
      res.status(200).json({ msg: "Application submitted successfully!" });
    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({ msg: "Failed to send email", error: error.message });
    }
  });
}
