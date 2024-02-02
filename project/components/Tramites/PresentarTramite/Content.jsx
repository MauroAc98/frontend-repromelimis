import api, { getResponseError } from "@/base/helpers/api";
import { Button } from "primereact/button";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useUserContext } from "@/base/context/userContext";

export const Content = (props) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { getSessionData } = useUserContext();

  const handleClickConfirmar = async () => {
    try {
      props.setContent("LOADING");

      const url =
        props.tramiteData.tipo_tramite == "INSCRIPCION"
          ? `/tramites/presentar-inscripcion/${props.tramiteData.id}`
          : `/tramites/presentar-actualizacion/${props.tramiteData.id}`;

      const { data } = await api.post(url);

      // Si tenemos un error de validacion
      if (data.error) {
        props.setResponseData({
          status: "ERROR_VALIDATION",
          errors: data.errors,
        });
        return;
      }

      // Si esta todo OK
      props.setRefreshTable((prevVal) => prevVal + 1);
      props.setResponseData({
        status: "SUCCESS",
        message: data.message,
      });

      // Si indico que requiere capacitacion, traemos datos actualizados de usuario
      if (
        props.tramiteData.tipo_capacitacion == "SIN_CAPACITACION_DESEA_REALIZAR"
      ) {
        getSessionData();
      }
    } catch (error) {
      props.setResponseData({
        status: "ERROR",
        message: getResponseError(error),
      });
    } finally {
      props.setContent("RESULT");
    }
  };

  return (
    <>
      <div className="text-lg flex gap-2 mt-3">
        <Checkbox
          onChange={(e) => setAcceptTerms(e.checked)}
          checked={acceptTerms}
        />
        <div>
          <div>
            Declaro bajo juramento haberme interiorizado de la ley VIII - N° 90
            de la Provincia de Misiones
            <a
              href="http://digestomisiones.gob.ar/uploads/documentos/leyes/Ley%20VIII%20-
                    %20N%2090.pdf?v=06/12/2022%2012:43:21"
              target="_blank"
              className="text-primary">
              &nbsp;(Ver aquí)&nbsp;
            </a>
            y de su decreto reglamentario, y me comprometo a cumplir con todas
            sus disposiciones.
          </div>
          <div>
            Me comprometo a mantener mí correo electrónico actualizado y acepto
            y reconozco como válidas las notificaciones recibidas al mismo.
          </div>
        </div>
      </div>
      {acceptTerms && (
        <div className="text-center mt-5">
          <Button
            icon="pi pi-check"
            label="Confirmar"
            className="p-button-success"
            onClick={handleClickConfirmar}
          />
        </div>
      )}
    </>
  );
};
