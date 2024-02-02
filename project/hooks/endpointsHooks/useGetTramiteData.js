import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetTramiteData(onBefore, onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getTramiteData = async (idTramite) => {
        try {
            // Ejecutamos la funcion onBefore que le pasemos
            onBefore();

            const { data } = await api.get(`/tramites/get-tramite-data/${idTramite}`);

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
        getTramiteData
    }
}