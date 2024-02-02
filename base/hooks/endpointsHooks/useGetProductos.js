import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";

export default function useGetProductos(onSuccess, onError) {
    const { showErrorMsg } = useToastContext();

    const getProductos = async () => {
        try {
            const { data } = await api.get("/producto/get-productos");
            
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
        getProductos
    }
}