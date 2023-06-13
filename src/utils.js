const createMessage = (correoCliente, mensaje) => {
    let mensajeHtml = `
    <div>
        <h1>Solicitud x....</h1>
        <h2>Correo cliente: ${correoCliente}</h2>
        <p>Mensaje: ${mensaje}</p>
    </div>`;

    return mensajeHtml;
};

export default createMessage;
