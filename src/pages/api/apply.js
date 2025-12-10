// pages/api/apply.js
import { transporter, mailOptions } from "@/lib/nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const {
      jobTitle,
      firstName,
      lastName,
      email,
      phone,
      resume, // resume: { name, type, size, content (base64) }
    } = req.body;

    // Basic validation
    if (!jobTitle || !firstName || !lastName || !email || !resume?.content) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const fullName = `${firstName} ${lastName}`.trim();

    await transporter.sendMail({
      ...mailOptions,
      to: "info@cleverproject.lk", // where we receive all applications
      subject: `New Job Application: ${jobTitle} - ${fullName}`,
      text: `
New job application received.

Job Title: ${jobTitle}
Name: ${fullName}
Email: ${email}
Phone: ${phone}

Check the attached resume file.
      `.trim(),
      html: `
        <h2>New Job Application</h2>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p>Resume is attached to this email.</p>
      `,
      attachments: [
        {
          filename: resume.name || "resume.pdf",
          content: resume.content, // base64 content
          encoding: "base64",
          contentType: resume.type || "application/octet-stream",
        },
      ],
    });

    return res
      .status(200)
      .json({ msg: "Application emailed successfully." });
  } catch (err) {
    console.error("Error sending application email:", err);
    return res.status(500).json({ msg: "Failed to send email." });
  }
}
