import SectionLoader from "@/base/components/Loader/SectionLoader";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import ContentHistorial from "./ContentHistorial";
import useGetSolicitudGuiaData from "@/project/hooks/endpointsHooks/useGetSolicitudGuiaData";

export default function DialogVerHistorial(props) {
  const [solicitud, setSolicitud] = useState({
    requestStatus: "INITIAL",
    data: {},
  });
  /** GET SOLICITUD GUIA DATA */
  const { getSolicitudData } = useGetSolicitudGuiaData(
    onBeforeGetSolicitudData,
    onSuccessGetSolicitudData,
    null
  );

  function onBeforeGetSolicitudData() {
    setSolicitud({
      requestStatus: "LOADING",
      data: null,
    });
  }

  function onSuccessGetSolicitudData(data) {
    setSolicitud({
      requestStatus: "SUCCESS",
      data: data,
    });
  }
  /** END GET TRAMITE DATA */


  const evalContent = () => {
    switch (solicitud.requestStatus) {
      case "LOADING":
        return <SectionLoader />;
      case "SUCCESS":
        return <ContentHistorial solicitudData={solicitud.data} />;
    }
  };

  useEffect(() => {
    /** Traemos datos de solicitud cuando abrimos dialog */
    if (props.showDialog) {
      getSolicitudData(props.idSolicitud);
    }
  }, [props.showDialog]);

  return (
    <Dialog
      header={`Historial Solicitud ${solicitud.data?.nro ?? ""}`}
      visible={props.showDialog}
      onHide={props.onHideDialog}
      style={{ width: "60vw" }}
      position="center"
      draggable={false}
    >
      {evalContent()}
    </Dialog>
  );
}
