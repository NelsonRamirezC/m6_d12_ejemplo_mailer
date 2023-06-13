import express from "express";
import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import chalk from "chalk";
import sendMail from "./nodemailer.js";
import createMessage from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//middleware
app.use(morgan("tiny"));
app.use(express.json());

//configuración handlebars
const hbs = create({
    partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// rutas vistas

app.get(["/", "/home"], (req, res) => {
    console.log(chalk.yellow("Ruta Home"));
    res.render("home");
});

app.get(["/contacts", "/contactos"], (req, res) => {
    res.render("contacts");
});

//rutas de api

app.post("/api/contacts", async (req, res) => {
    try {
        let { email, consulta } = req.body;
        if (!email || !consulta) {
            return res.status(500).send({
                code: 400,
                message: "Debe proporcionar un correo y una consulta",
            });
        }
        let mensajeHtml = createMessage(email, consulta);

        let respuesta = await sendMail(mensajeHtml);
        res.status(201).send({ code: 201, message: respuesta });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "No se pudo procesar la solicitud.",
        });
    }
});

export default app;
