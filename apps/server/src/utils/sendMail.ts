import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions) => {
  // 1. Create a transporter
  // For development, use Mailtrap. For production, use Gmail/SendGrid.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: `Cartovex Support <support@cartovex.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: `<b>${options.message}</b>`, // You can add HTML later
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
