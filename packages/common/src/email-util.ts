import 'dotenv/config';
import nodemailer from 'nodemailer';

const mailUserName = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;
const mailServerConfig = {
  host: 'host.docker.internal',
  port: 1025,
  secure: false, // Use TLS
  auth: {
    user: mailUserName, // Replace with your email address
    pass: mailPassword, // Replace with your email password
  },
  tls: {
    ciphers: 'SSLv3',
  },
};

export class EmailUtil {
  static async sendEmail(subject: string, message: string) {
    const receiverConfig = process.env.MAIL_RECEIVER;

    if (!mailUserName || !mailPassword || !receiverConfig) {
      throw new Error('Please provide MAIL_USERNAME, MAIL_PASSWORD and MAIL_RECEIVER in .env file');
    }

    let receivers: string[] = receiverConfig.split(',');

    try {
      const transporter = nodemailer.createTransport(mailServerConfig);

      const mailOptions = {
        from: mailUserName,
        to: receivers,
        subject: subject,
        text: message,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully: ${info.response}`);
    } catch (error: any) {
      console.error(`Error send email occurred: ${error.message}`);
    }

  }
}