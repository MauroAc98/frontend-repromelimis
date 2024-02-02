import axios from 'axios';
import jwt_decode from "jwt-decode";

const api = () => {
    const defaultOptions = {
        baseURL: `${process.env.url_back}/`,
    };

    /** Creamos instancia */
    let instance = axios.create(defaultOptions);

    /** Seteamos el AUTH token a la cabecera para cada peticion */
    instance.interceptors.request.use(function (config) {
        // Añadimos a la cabecera Authorization
        config.headers.Authorization = `Bearer ${getToken()}`;

        return config;
    });

    /** Capturamos respuestas con interceptor */
    instance.interceptors.response.use(function (response) {

        /** IMPORTANTE: Esto funciona solo en modo produccion, de querer probar, cambiar el strict mode en archivo next.config.js */
        // Si el backend nos envia un refreshtoken, actualizamos localStorage 
        if (response.headers['refreshtoken']) {
            setToken(response.headers['refreshtoken'])
        }

        // Retornamos las respuestas, no hace falta hacer nada
        return response;
    }, function (error) {
        const errorResponse = error.response;

        /** Unauthorized */
        if (errorResponse.status === 401) {
            removeToken();
            window.location = `${process.env.url_front}/auth/login`;
        }

        // Si es un codigo diferente al 401 y 555 con code 1000, retornamos los errores
        return Promise.reject(error);
    });

    return instance;
};

const MEDIA_HEADERS = {
    headers: {
        "Content-Type": "multipart/form-data", // Si vamos a enviar archivos, debe ir
    },
}

const setToken = (token) => {
    localStorage.setItem("token", token);
}

const getToken = () => {
    return localStorage.getItem("token");
}

const removeToken = () => {
    localStorage.removeItem("token");
}

const addAuthMsg = (msg) => {
    localStorage.setItem("auth_msg", msg);
}

const removeAuthMsg = () => {
    localStorage.removeItem("auth_msg");
}

const getAuthMsg = () => {
    return localStorage.getItem("auth_msg");
}

// Crea un msg de errores de validacion que vienen del backend
const createValidationErrorsMsg = (errors) => {
    // Obtenemos los errors y creamos un solo string 
    const getErrors = (errMsg) => {
        let msgs = '';
        errMsg.forEach(item => {
            msgs += item + " ";
        });
        return msgs;
    }

    let errorsHtml = '<div style="font-size:14px;"><ul>';
    Object.keys(errors).forEach((item) => {
        let errMsg = getErrors(errors[item]);
        errorsHtml += `
        <li>
            <strong>${item}:</strong> ${errMsg}
        </li>
        `;
    });
    errorsHtml += '</ul></div>';
    return errorsHtml;
}

const getResponseError = (errorResponse) => {
    let msg = '';
    // Evaluamos msj de error
    const data = errorResponse?.response?.data;

    // Si es un msj de axios, mostramos lo que nos devuelve el back, sino mostramos un msj generico
    if (data) {
        switch (errorResponse.response.status) {
            // Error de validacion
            case 422:
                msg = createValidationErrorsMsg(data.errors);
                break;

            // Otros errores
            default:
                // Verifica errores de integridad
                if (data?.error?.includes("SQLSTATE[23000]")) {
                    msg = 'No se puede realizar la accion, ya que el registro se encuentra relacionado con otro.'
                } else {
                    // Si tenemos un msj lo mostramos, sino mostramos el codigo http
                    msg = data?.error ?? `Status Code: ${errorResponse?.response.status}`;
                }
                break;
        }
    } else {
        msg = "Ocurrió un problema al procesar la solicitud.";
    }
    return msg
}


export { setToken, removeToken, getToken, getResponseError, addAuthMsg, removeAuthMsg, getAuthMsg, MEDIA_HEADERS };

export default api();
