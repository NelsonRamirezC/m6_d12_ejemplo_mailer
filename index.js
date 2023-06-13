import app from "./src/app.js";

let PORT = 3000;

const main = () => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
};

main();
