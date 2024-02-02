import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetSolicitudGuiaData(onBefore, onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getSolicitudData = async (idSolicitud) => {
        try {
            // Ejecutamos la funcion onBefore que le pasemos
            onBefore();

            const { data } = await api.get(`/solicitudes-guias/get-solicitud-data/${idSolicitud}`);

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
        getSolicitudData
    }
}