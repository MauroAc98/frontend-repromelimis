import useCustomForm from "@/base/hooks/useCustomForm";
import SearchMeliponario from "./SearchMeliponario";
import { useEffect } from "react";
import MeliponarioData from "./MeliponarioData";
import { Button } from "primereact/button";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import api, { getResponseError } from "@/base/helpers/api";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import ResetButton from "./ResetButton";
import { useRouter } from "next/router";

export default function OrigenDestinoMeliponarios() {
  const { formData, setFormData } = useCustomForm();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { datosSolicitud, datosMeliponarios } = useSolicitudGuiaContext();
  const router = useRouter();

  const handleClickGuardarAndContinuar = async () => {
    try {
      showBackdropLoader();

      const { data } = await api.post(
        "solicitudes-guias/update-origen-destino-meliponarios",
        formData
      );

      // Avanzamos a siguiente pagina
      showSuccessMsg(data.message);
      router.push("/guias-traslado/solicitudes/movimientos-colmenas");
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  /** Evaluamos botones que mostrar */
  const evalButtons = () => {
    if (
      datosSolicitud.id_meliponario_origen &&
      datosSolicitud.id_meliponario_destino
    ) {
      return (
        <>
          <ResetButton />
          <Button
            className="p-button-sm"
            label="Continuar"
            onClick={() =>
              router.push("/guias-traslado/solicitudes/movimientos-colmenas")
            }
          />
        </>
      );
    } else {
      return (
        <Button
          className="p-button-sm"
          label="Guardar y continuar"
          onClick={handleClickGuardarAndContinuar}
        />
      );
    }
  };

  /** Seteamos datos de meliponarios si tenemos */
  useEffect(() => {
    setFormData(datosMeliponarios);
  }, [datosMeliponarios]);

  return (
    <div>
      <div className="mb-5">
        <h3 className="mb-2">Meliponario origen</h3>
        {formData?.meliponario_origen ? (
          <MeliponarioData
            type="ORIGEN"
            meliponarioData={formData.meliponario_origen}
            setFormData={setFormData}
          />
        ) : (
          <SearchMeliponario type={"ORIGEN"} setFormData={setFormData} />
        )}
      </div>

      <div className="mb-5">
        <h3 className="mb-2">Meliponario destino</h3>
        {formData?.meliponario_destino ? (
          <MeliponarioData
            type="DESTINO"
            meliponarioData={formData.meliponario_destino}
            setFormData={setFormData}
          />
        ) : (
          <SearchMeliponario type={"DESTINO"} setFormData={setFormData} />
        )}
      </div>

      <div className="mt-3 flex justify-content-end gap-2">{evalButtons()}</div>
    </div>
  );
}
