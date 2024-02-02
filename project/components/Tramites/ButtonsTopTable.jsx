import { Button } from "primereact/button";
import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useRouter } from "next/router";
import { FIRST_PAGE_FORM } from "@/pages/tramites";
import { useEffect, useState } from "react";
import { useTramiteContext } from "@/project/context/TramiteContext";

export default function ButtonsTopTable(props) {
  const router = useRouter();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader, showConfirmDialog } =
    useGeneralContext();
  const { showDialogInitActualizacion } = useTramiteContext();
  const [tramitesAction, setTramitesAction] = useState(null);

  const getTramitesAction = async () => {
    try {
      const { data } = await api.get("/tramites/get-tramites-action");
      // Si todo esta OK
      setTramitesAction(data.action);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    }
  };

  const onConfirmInscripcion = async () => {
    try {
      showBackdropLoader();
      const { data } = await api.post("/tramites/create-inscripcion");
      // Si todo esta OK
      showSuccessMsg(data.message);
      router.push(FIRST_PAGE_FORM);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const onConfirmActualizacion = async () => {
    try {
      showBackdropLoader();
      const { data } = await api.post("/tramites/create-actualizacion");
      // Si todo esta OK
      showDialogInitActualizacion(data.repromelimis_data);
      router.push(FIRST_PAGE_FORM);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const onClickInscripcion = async () => {
    showConfirmDialog(
      "Confirmar",
      "Esta seguro/a de iniciar un trámite de tipo inscripción?",
      () => onConfirmInscripcion()
    );
  };

  const onClickActualizacion = async () => {
    showConfirmDialog(
      "Confirmar",
      "Esta seguro/a de iniciar un trámite de tipo actualización?",
      () => onConfirmActualizacion()
    );
  };

  useEffect(() => {
    getTramitesAction();
  }, [props.refreshTable]);

  if (tramitesAction == "INSCRIPCION") {
    return (
      <Button
        label="Inscripción"
        onClick={onClickInscripcion}
        className="p-button-success p-button-sm"
      />
    );
  }

  if (tramitesAction == "ACTUALIZACION") {
    return (
      <Button
        label="Actualización"
        onClick={onClickActualizacion}
        className="p-button-success p-button-sm"
      />
    );
  }

  return <></>;
}
