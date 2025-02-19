// src/pages/api/contact.js
import { transporter, mailOptions } from "../../../Context/nodemailer";

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const { name, message, email } = req.body;

  // Validate request data
  if (!name || !message || !email || message.trim() === "") {
    return res.status(400).json({ msg: "Invalid request data" });
  }

  try {
    // Send email to info@cleverproject.lk
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender info
      to: "info@cleverproject.lk", // Recipient email
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #105EEA; text-align: center;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #105EEA;">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
          <hr>
          <p style="text-align: center; color: #666;">This email was sent from the contact form on <strong>Clever Projects</strong>.</p>
        </div>
      `,
    });

    return res.status(200).json({ msg: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ msg: "Failed to send email", error: error.message });
  }
}
