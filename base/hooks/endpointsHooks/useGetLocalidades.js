import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetLocalidades(onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getLocalidades = async (deptoId) => {
        try {
            const { data } = await api.get(`/direccion/get-localidades/${deptoId}`);

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
        getLocalidades
    }
}