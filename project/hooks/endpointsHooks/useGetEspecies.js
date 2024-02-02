import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetEspecies(onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getEspecies = async () => {
        try {
            const { data } = await api.get("/especies/list");

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
        getEspecies
    }
}