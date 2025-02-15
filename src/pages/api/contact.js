// src/pages/api/contact.js
import { transporter, mailOptions } from "../../../Context/nodemailer";

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const { name, message, email } = req.body;

  if (!name || !message || !email || message === "message") {
    return res.status(400).json({ msg: ["Bad request"] });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "You have a mail to Cleaver Projects by " + name,
      text: "Sample text",
      html: `<meta content="width=device-width"name=viewport><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><table style="width:100%!important;height:100%;background-color:#fafafa;padding:20px;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,"Lucida Grande",sans-serif;font-size:100%;line-height:1.6"bgcolor=#fafafa><tr><td><td bgcolor=#FFFFFF style="border:1px solid #eee;background-color:#fff;border-radius:5px;display:block!important;max-width:600px!important;margin:0 auto!important;clear:both!important"><div style="padding:20px;max-width:600px;margin:0 auto;display:block"><table style=width:100%><tr><td><p style="text-align:center;display:block;padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #ddd"><img height="78" src="https://www.cleaverprojects.com/img/logo.png"><h1 style="font-weight:200;font-size:36px;margin:20px 0 30px 0;color:#333">Details...</h1><p style=margin-bottom:10px;font-weight:400;font-size:16px;color:#333>${message}<h2 style="font-weight:200;font-size:16px;margin:20px 0;color:#333">Name: ${name}</h2><h2 style="font-weight:200;font-size:16px;margin:20px 0;color:#333">Email: ${email}</h2><p style="text-align:center;display:block;padding-top:20px;font-weight:700;margin-top:30px;color:#666;border-top:1px solid #ddd">Cleaver Projects</table></div><td></table>`,
    });
    return res.status(200).json({ msg: ["success"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
}
