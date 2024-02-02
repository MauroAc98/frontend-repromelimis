import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetDepartamentos(onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getDepartamentos = async () => {
        try {
            const { data } = await api.get("/direccion/get-departamentos");

            // Ejecutamos la funcion success que le pasemos
            onSuccess(data);

        } catch (error) {
            showErrorMsg(getResponseError(error));
            if (typeof onError == 'function') {
                // Ejecutamos la funcion error que le pasemos
                onError();
            }
        }
    }

    return {
        getDepartamentos
    }
}