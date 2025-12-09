// lib/nodemailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export const mailOptions = {
  from: `"Clever Project" <${process.env.ZOHO_EMAIL || "info@cleverproject.lk"}>`,
};
