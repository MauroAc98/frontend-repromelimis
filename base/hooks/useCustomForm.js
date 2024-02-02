import { useEffect, useState } from "react";

export default function useCustomForm(initialValues, initialFormErrors) {
    // Estado donde se guardara todos los valores del formulario
    const [formData, setFormData] = useState(initialValues);
    // Estado donde se guardaran los errores de cada input del formulario
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    // Estado donde se almacenaran otros errores
    const [moreFormErrors, setMoreFormErrors] = useState([]);

    /** FUNCION QUE SETEA VALOR EN ESTADO
     * Podemos pasarle un name separado con puntos. Ej:
     * Si le pasamos "persona.nombre", nuestro estado quedara asi
     * {
     *  persona:{
     *      nombre:'valor'
     *  }
     * }
     */

    const setNestedValue = (setState, name, value) => {
        // Divide el nombre en partes separadas por puntos
        const nestedNames = name.split(".");

        // Setea en estado correspondiente
        setState((prevData) => {
            // Crea una copia del estado actual
            const updatedData = { ...prevData };
            let currentObj = updatedData;
            nestedNames.forEach((nestedName, index) => {
                if (index === nestedNames.length - 1) {
                    // Última clave: asigna el valor
                    currentObj[nestedName] = value;
                } else {
                    // Verifica si la clave ya existe o necesita ser creada como objeto vacío
                    currentObj[nestedName] = currentObj[nestedName] || {};
                    currentObj = currentObj[nestedName];
                }
            });
            // Actualiza el estado con el nuevo objeto
            return updatedData;
        });
    }

    /** FUNCION PARA SETEAR PROPIEDADES EN FORMDATA */
    const handleFormChange = ({ target }) => {
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        // Seteamos valor en formData
        setNestedValue(setFormData, name, value);

        // Limpiamos msj de error del objeto
        setNestedValue(setFormErrors, name, null);

        // Quitamos los demas errores
        setMoreFormErrors([]);
    };

    /** FUNCION PARA SETEAR CORRECTAMENTE EN FORM ERRORS */
    const handleSetFormErrors = (inputName, msg) => {
        setNestedValue(setFormErrors, inputName, msg);
    }



    /** DEJA EN VALORES INICIALES A LOS ESTADOS */
    const resetForm = () => {
        setFormData(initialValues);
        setFormErrors(initialFormErrors);
        setMoreFormErrors([]);
    };

    return {
        handleFormChange,
        handleSetFormErrors,
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        moreFormErrors,
        setMoreFormErrors,
        resetForm
    };
}