import { Button } from "primereact/button";
import api, { getResponseError } from "@/base/helpers/api";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
export default function ResetButton() {
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader, showConfirmDialog } =
    useGeneralContext();
  const { getSolicitudActual } = useSolicitudGuiaContext();

  const onConfirmResetear = async () => {
    try {
      showBackdropLoader();

      const { data } = await api.post(
        "solicitudes-guias/reset-origen-destino-meliponarios"
      );

      // Mostramos msj y actualizamos datos
      showSuccessMsg(data.message);
      getSolicitudActual();
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const handleClickResetear = () => {
    showConfirmDialog(
      "Confirmar",
      "Esta seguro/a de resetear los datos de meliponario origen y destino? Esto también reseteará los movimientos ingresados",
      () => onConfirmResetear()
    );
  };

  return (
    <Button
      className="p-button-sm p-button-warning"
      label="Resetear"
      onClick={handleClickResetear}
    />
  );
}
