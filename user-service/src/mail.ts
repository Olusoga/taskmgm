/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: "olusogaolamileksy@gmail.com",
    pass: "jdrgsajzudlyzpoy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify(function (error: any, success: any) {
  if (error) {
    console.warn(error.message);
  } else {
    console.info('Server is ready to take our messages');
  }
});

export async function sendEmailForTaskAssignment(
  email: string,
  message:string
) {
  await transporter.sendMail({
    from: 'no-reply@momocredits.com',
    to: `${email}`,
    subject: 'yyy',
    html: `${message}`,
  });
}

export async function sendEmailForTaskDue(
  email: string,
  message:string
) {
  await transporter.sendMail({
    from: 'no-reply@momocredits.com',
    to: `${email}`,
    subject: 'xxx',
    html: `${message}`,
  });
}


