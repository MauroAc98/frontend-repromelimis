import { Tag } from "primereact/tag";
import { Timeline } from "primereact/timeline";
import { formatDate } from "@/base/helpers/utils";
import { Button } from "primereact/button";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useRouter } from "next/router";
import api, { getResponseError } from "@/base/helpers/api";

export default function ContentHistorial({ solicitudData }) {
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const router = useRouter();

  const habilitarCargaDatosFaltantes = async () => {
    try {
      showBackdropLoader();
      const { data } = await api.post(
        `/solicitudes-guias/habilitar-carga-datos-faltantes/${solicitudData.id}`
      );
      showSuccessMsg(data.message);
      router.push("/guias-traslado/solicitudes/datos-iniciales");
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const estadoTemplate = (estado) => {
    switch (estado) {
      case "EN_CARGA":
        return <Tag value="EN CARGA" />;
      case "EN_ESPERA_APROBACION":
        return <Tag value="EN ESPERA DE APROBACION" severity="info" />;
      case "APROBADO":
        return <Tag value="APROBADO" severity="success" />;
      case "RECHAZADO":
        return <Tag value="RECHAZADO" severity="danger" />;
      case "DATOS_INSUFICIENTES":
        return <Tag value="DATOS INSUFICIENTES" severity="warning" />;
      case "REQUIERE_CAPACITACION":
        return <Tag value="REQUIERE CAPACITACION" severity="warning" />;
    }
  };

  return (
    <>
      <Timeline
        className="mt-5"
        value={solicitudData.historial}
        opposite={(item) => (
          <div className="mb-4">
            <div className="mb-2">{estadoTemplate(item.estado)}</div>
            <div className="text-sm">{item.observacion}</div>
          </div>
        )}
        content={(item) => (
          <small className="text-color-secondary">
            {formatDate("dd/mm/yyyy|hh:mm", item.fecha_hora)}
          </small>
        )}
      />
      {solicitudData.estado_actual == "DATOS_INSUFICIENTES" && (
        <div className="mt-3 text-center">
          <Button
            icon="pi pi-pencil"
            label="Habilitar para cargar datos faltantes"
            className="p-button-secondary p-button-outlined"
            onClick={habilitarCargaDatosFaltantes}
          />
        </div>
      )}
    </>
  );
}
