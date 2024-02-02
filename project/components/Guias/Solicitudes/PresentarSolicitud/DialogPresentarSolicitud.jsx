import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import SectionLoader from "@/base/components/Loader/SectionLoader";
import { Content } from "./Content";
import { Result } from "./Result";
//import Preview from "../PreviewTramite/Preview";
import useGetSolicitudGuiaData from "@/project/hooks/endpointsHooks/useGetSolicitudGuiaData";
import Preview from "./PreviewGuiaTraslado/Preview";

export default function DialogPresentarSolicitud(props) {
  const [content, setContent] = useState("LOADING");
  const [responseData, setResponseData] = useState({
    status: null,
    message: null,
    errors: [],
  });

  const [solicitudData, setSolicitudData] = useState(null);

  /** GET TRAMITE DATA */
  const { getSolicitudData } = useGetSolicitudGuiaData(
    onBeforeGetSolicitudData,
    onSuccessGetSolicitudData,
    null
  );

  function onBeforeGetSolicitudData() {
    setSolicitudData(null);
    setContent("LOADING");
  }

  function onSuccessGetSolicitudData(data) {
    setSolicitudData(data);
    setContent("INIT_DATA");
  }
  /** END GET TRAMITE DATA */

  const evalContent = () => {
    switch (content) {
      case "LOADING":
        return <SectionLoader />;
      case "INIT_DATA":
        return (
          <>
            <Preview data={solicitudData} />
            <Content
              setRefreshTable={props.setRefreshTable}
              setContent={setContent}
              setResponseData={setResponseData}
              solicitudData={solicitudData}
            />
          </>
        );
      case "RESULT":
        return <Result responseData={responseData} />;
    }
  };

  useEffect(() => {
    /** Traemos datos de tramite cuando abrimos dialog */
    if (props.showDialog) {
      getSolicitudData(props.idSolicitud);
    }
  }, [props.showDialog]);

  return (
    <Dialog
      header={`Presentar Solicitud ${solicitudData?.nro ?? ""}`}
      visible={props.showDialog}
      onHide={props.onHideDialog}
      style={{ width: "70vw" }}
      position="center"
      draggable={false}
      closable={content != "LOADING" ?? false}>
      {evalContent()}
    </Dialog>
  );
}
