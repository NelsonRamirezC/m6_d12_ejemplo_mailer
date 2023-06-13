import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
import "dotenv/config";

const sendMail = (mensaje) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.CORREO,
                    pass: process.env.PASS
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            const mailOptions = {
                from: "correpruebanodejs@gmail.com",
                //replyTo: "correo@gmail.com",
                to: "correpruebanodejs@gmail.com",
                subject: `Solcitud cliente N° ${uuid().slice(0, 6)}.`,
                html: mensaje,
            };

            await transporter.sendMail(mailOptions);
            resolve("Correo enviado con éxito.");
        } catch (error) {
            reject("Error al procesar el correo.");
        }
    });
};

export default sendMail;
