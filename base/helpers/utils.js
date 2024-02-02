import { getToken } from "./api";

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

/** Retorna un date en formato especifico */
export const formatDate = (format, date) => {
    // Crear un objeto Date 
    const fecha = new Date(date);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    let fechaFormateada = "";

    switch (format) {
        case 'dd/mm/yyyy':
            fechaFormateada = `${dia}/${mes}/${anio}`;
            break;
        case 'mm/yyyy':
            fechaFormateada = `${mes}/${anio}`;
            break;
        case 'dd/mm/yyyy|hh:mm':
            fechaFormateada = `${dia}/${mes}/${anio}, ${horas}:${minutos}`;
            break;
    }

    return fechaFormateada;
}

/** Retorna un timestamp en formato Date */
export const formatTimestampToDate = (date) => {
    const formattedDate = date ? new Date(date) : null;
    return formattedDate;
}

/** Formatea un objeto a un FormData, util para enviar archivos */
export const formatMultipartFormData = (
    array_keys,
    object,
    _formData = new FormData(),
    parentKey = ""
) => {
    // Recorro keys de mi objeto
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            /** Verifico si mi key es un numero es decir que estoy enviando por ej:
             *  --- galeria[0][file_name]
             *  Dejo solo: galeria[][file_name]
             */
            const currentKey = parentKey
                ? `${parentKey}[${isNumber(key) ? "" : key}]`
                : key;
            if (typeof value === "object" && value !== null) {
                // Si el value es de tipo Date, lo añado al formData
                if (value instanceof Date) {
                    _formData.append(currentKey, value);
                } else if (value instanceof File) {
                    // Si llego al objeto que tiene un File, añado sin las propiedades, por ej:
                    // galeria[]: File
                    _formData.append(parentKey, value, value.name);
                } else {
                    formatMultipartFormData(array_keys, value, _formData, currentKey);
                }
            } else {
                // Verificamos que el parentKey no se incluya en el array de keys que son tipo Archivo
                if (!array_keys.includes(parentKey)) {
                    _formData.append(currentKey, value);
                }
            }
        }
    }
    return _formData;
}

/** Recorre un objeto FormData y muestra sus valores */
export const checkFormData = (_data) => {
    // Comprobar el contenido del FormData
    for (const [key, value] of _data.entries()) {
        console.log(key, value);
    }

}

/** Abre en nueva nueva pestaña */
export const openUrl = (url, addToken) => {
    let finalUrl = url;

    // Añadimos token si lo requiere para url protegidas
    if (addToken) {
        finalUrl += `?token=${getToken()}`;
    }

    window.open(finalUrl, '_blank');
}
