import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com", // Zoho SMTP Server
  port: 465, // SSL Port
  secure: true, // Use SSL
  auth: {
    user: process.env.ZOHO_EMAIL, // Use environment variable
    pass: process.env.ZOHO_PASSWORD, // Use environment variable
  },
});

export const mailOptions = {
  from: `"Clever Project" <info@cleverproject.lk>`, // Your Zoho email
};
