"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailForTaskDue = exports.sendEmailForTaskAssignment = void 0;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
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
transporter.verify(function (error, success) {
    if (error) {
        console.warn(error.message);
    }
    else {
        console.info('Server is ready to take our messages');
    }
});
async function sendEmailForTaskAssignment(email, message) {
    await transporter.sendMail({
        from: 'no-reply@momocredits.com',
        to: `${email}`,
        subject: 'yyy',
        html: `${message}`,
    });
}
exports.sendEmailForTaskAssignment = sendEmailForTaskAssignment;
async function sendEmailForTaskDue(email, message) {
    await transporter.sendMail({
        from: 'no-reply@momocredits.com',
        to: `${email}`,
        subject: 'xxx',
        html: `${message}`,
    });
}
exports.sendEmailForTaskDue = sendEmailForTaskDue;
//# sourceMappingURL=mail.js.map