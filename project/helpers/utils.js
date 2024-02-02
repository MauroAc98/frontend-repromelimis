/** Retorna una fecha en formato AAAA-MM-DDTHH:mm:ss.sssZ */
export const formatDateToIso = (date) => {
    const formattedDate = date.toISOString();
    return formattedDate;
}

/** Verifica si es un numero el que ingreso */
export const isNumber = (value) => {
    return !isNaN(value) ? true : false;
}

/** Nos provee de una mascara de tipo fecha */
export const maskDate = (event) => {
    let returnData = event.key;
    return returnData;
}
export const validateEmail = (value) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(value);
}

export const arePasswordsEqual = (pass1, pass2) => {
    return pass1 === pass2;
};

/** Formatea un timestamp en string */
export const formatTimestamp = (timestamp, format) => {
    // Crear un objeto Date con el timestamp
    const fecha = new Date(timestamp);

    // Obtener el día, el mes y el año
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
    const anio = fecha.getFullYear();

    let fechaFormateada = "";

    switch (format) {
        case 'dd/mm/yyyy':
            fechaFormateada = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + anio.toString();
            break;
        case 'mm/yyyy':
            fechaFormateada = mes.toString().padStart(2, '0') + '/' + anio.toString();
            break;
    }

    return fechaFormateada;
}

/** Retorna un timestamp en formato Date */
export const formatTimestampToDate = (date) => {
    const formattedDate = date ? new Date(date) : null;
    return formattedDate;
}

/** Retorna mascara de nro repromelimis 00001 */
export const maskNroRepromelimis = (numero) => {
    let formattedValue = null;
    if (isNumber(numero)) {
        // Agregamos 0 delante
        formattedValue = String(numero).padStart(5, '0')
    }
    return formattedValue;
}

/** Retorna mascara de nro guia 00001 */
export const maskNroGuia = (numero) => {
    let formattedValue = null;
    if (isNumber(numero)) {
        // Agregamos 0 delante
        formattedValue = String(numero).padStart(5, '0')
    }
    return formattedValue;
}

