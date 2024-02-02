import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import api, { getResponseError } from "@/base/helpers/api";

export default function useGenericDelete() {
    const { showConfirmDialog, hideBackdropLoader, showBackdropLoader } = useGeneralContext();
    const { showErrorMsg, showSuccessMsg } = useToastContext();


    const onConfirmDelete = async (url, params, onSuccess) => {
        try {
            showBackdropLoader();
            const { data } = await api.delete(url, {
                params: params
            });
            // Mostramos msj y ejecutamos onSuccess que le pasemos
            showSuccessMsg(data.message);
            onSuccess(data);
        } catch (error) {
            showErrorMsg(getResponseError(error));
        } finally {
            hideBackdropLoader();
        }
    }


    const genericDelete = (url, params, onSuccess) => {
        showConfirmDialog("Confirmar", "Esta seguro/a de eliminar el registro? Se eliminará permanentemente.", () => onConfirmDelete(url, params, onSuccess));
    }

    return {
        genericDelete
    }
}