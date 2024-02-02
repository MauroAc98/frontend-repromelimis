import { Button } from "primereact/button";
import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useRouter } from "next/router";
import { FIRST_PAGE_FORM } from "@/pages/guias-traslado/solicitudes";
import { useEffect, useState } from "react";

export default function ButtonsTopTable(props) {
  const router = useRouter();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader, showConfirmDialog } =
    useGeneralContext();
  const [solicitudesAction, setSolicitudesAction] = useState(null);

  const getSolicitudesAction = async () => {
    try {
      const { data } = await api.get(
        "/solicitudes-guias/get-solicitudes-action"
      );
      // Si todo esta OK
      setSolicitudesAction(data.action);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    }
  };

  const onConfirmCrear = async () => {
    try {
      showBackdropLoader();
      const { data } = await api.post("/solicitudes-guias/create-solicitud");
      // Si todo esta OK
      showSuccessMsg(data.message);
      router.push(FIRST_PAGE_FORM);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const onClickCrear = async () => {
    showConfirmDialog(
      "Confirmar",
      "Esta seguro/a de crear una solicitud para una guia de traslado?",
      () => onConfirmCrear()
    );
  };

  useEffect(() => {
    getSolicitudesAction();
  }, [props.refreshTable]);

  if (solicitudesAction == "CREAR") {
    return (
      <Button
        label="Crear"
        onClick={onClickCrear}
        className="p-button-success p-button-sm"
      />
    );
  }

  return <></>;
}
