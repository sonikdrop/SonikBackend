import nodemailer from "nodemailer";
import appConfig from "../configs/app.config";

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
        auth: {
            user: appConfig.EMAIL_USER,
            pass: appConfig.EMAIL_PASS
        }

    });
    const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        return error;
    }
}


export const sendOtp = async (email: string, username: string, otp: string) => {
    return await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
}