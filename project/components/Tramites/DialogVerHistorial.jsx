import SectionLoader from "@/base/components/Loader/SectionLoader";
import useGetTramiteData from "@/project/hooks/endpointsHooks/useGetTramiteData";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import ContentHistorial from "./ContentHistorial";

export default function DialogVerHistorial(props) {
  const [tramite, setTramite] = useState({
    requestStatus: "INITIAL",
    data: {},
  });
  /** GET TRAMITE DATA */
  const { getTramiteData } = useGetTramiteData(
    onBeforeGetTramiteData,
    onSuccessGetTramiteData,
    null
  );

  function onBeforeGetTramiteData() {
    setTramite({
      requestStatus: "LOADING",
      data: null,
    });
  }

  function onSuccessGetTramiteData(data) {
    setTramite({
      requestStatus: "SUCCESS",
      data: data,
    });
  }
  /** END GET TRAMITE DATA */


  const evalContent = () => {
    switch (tramite.requestStatus) {
      case "LOADING":
        return <SectionLoader />;
      case "SUCCESS":
        return <ContentHistorial tramiteData={tramite.data} />;
    }
  };

  useEffect(() => {
    /** Traemos datos de tramite cuando abrimos dialog */
    if (props.showDialog) {
      getTramiteData(props.idTramite);
    }
  }, [props.showDialog]);

  return (
    <Dialog
      header={`Historial Trámite ${tramite.data?.nro ?? ""}`}
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
