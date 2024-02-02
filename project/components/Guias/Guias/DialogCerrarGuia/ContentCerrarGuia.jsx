import MovimientosMeliAMeli from "./MeliAMeli/MovimientosMeliAMeli";
import { Button } from "primereact/button";
import OrigenDestinoMeliAMeli from "./MeliAMeli/OrigenDestinoMeliAMeli";
import HeaderCerrarGuia from "./HeaderCerrarGuia";
import { useGeneralContext } from "@/base/context/GeneralContext";
import api, { getResponseError } from "@/base/helpers/api";
import OrigenDestinoRescate from "./Rescate/OrigenDestinoRescate";
import MovimientosRescate from "./Rescate/MovimientosRescate";

export default function ContentCerrarGuia(props) {
  const { showConfirmDialog } = useGeneralContext();

  const evalOrigenDestino = () => {
    if (props.guiaData.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO") {
      return <OrigenDestinoMeliAMeli guiaData={props.guiaData} />;
    } else {
      return <OrigenDestinoRescate guiaData={props.guiaData} />;
    }
  };

  const evalMovimientos = () => {
    if (props.guiaData.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO") {
      return <MovimientosMeliAMeli movimientos={props.guiaData.movimientos} />;
    } else {
      return <MovimientosRescate movimientos={props.guiaData.movimientos} />;
    }
  };

  const onConfirmCerrar = async () => {
    try {
      props.setContent("LOADING");

      const url = `/guias/cerrar-guia/${props.guiaData.id}`;

      const { data } = await api.post(url);

      // Si esta todo OK
      props.setRefreshTable((prevVal) => prevVal + 1);
      props.setResponseData({
        status: "SUCCESS",
        message: data.message,
      });
    } catch (error) {
      props.setResponseData({
        status: "ERROR",
        message: getResponseError(error),
      });
    } finally {
      props.setContent("RESULT");
    }
  };

  const handleClickConfirmar = () => {
    showConfirmDialog(
      "Confirmar",
      "Esta seguro/a de confirmar el cierre de la guía?",
      () => onConfirmCerrar()
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <HeaderCerrarGuia
          nro={props.guiaData.nro}
          motivoSolicitud={props.guiaData.motivo_solicitud}
          fechaVencimiento={props.guiaData.fecha_vencimiento}
        />
      </div>
      <div className="col-12">{evalOrigenDestino()}</div>
      <div className="col-12 mt-6">{evalMovimientos()}</div>
      <div className="col-12 mt-3">
        <i>
          Esta guia debe ser cerrada posteriormente a la instalacion de la
          colmena en el meliponario de destino.
        </i>
      </div>
      <div className="col-12 mt-3 flex justify-content-end">
        <Button
          label="Confirmar Cierre"
          className="p-button-sm p-button-primary"
          onClick={handleClickConfirmar}
        />
      </div>
    </div>
  );
}
