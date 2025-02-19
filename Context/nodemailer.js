import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com", // ✅ Use Zoho SMTP
  port: 465, // ✅ Use SSL port
  secure: true, // ✅ Use SSL
  auth: {
    user: process.env.ZOHO_EMAIL, // ✅ Use environment variables
    pass: process.env.ZOHO_PASSWORD, // ✅ Use environment variables
  },
});

export const mailOptions = {
  from: `"Clever Project" <info@cleverproject.lk>`, // ✅ Use Zoho Mail
};
