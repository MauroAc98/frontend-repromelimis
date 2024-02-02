import SectionLoader from "@/base/components/Loader/SectionLoader";
import useGetGuia from "@/project/hooks/endpointsHooks/useGetGuia";
import useGetTramiteData from "@/project/hooks/endpointsHooks/useGetTramiteData";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import ContentCerrarGuia from "./ContentCerrarGuia";
import { Result } from "./Result";

export default function DialogCerrarGuia(props) {
  const [content, setContent] = useState("LOADING");
  const [guiaData, setGuiaData] = useState(null);
  const [responseData, setResponseData] = useState({
    status: null,
    message: null,
    errors: [],
  });
  /** GET GUIA DATA */
  const { getGuiaData } = useGetGuia(
    onBeforeGetGuiaData,
    onSuccessGetGuiaData,
    null
  );

  function onBeforeGetGuiaData() {
    setGuiaData(null);
    setContent("LOADING");
  }

  function onSuccessGetGuiaData(data) {
    setGuiaData(data);
    setContent("INIT_DATA");
  }
  /** END GET TRAMITE DATA */

  const evalContent = () => {
    switch (content) {
      case "LOADING":
        return <SectionLoader />;
      case "INIT_DATA":
        return (
          <ContentCerrarGuia
            guiaData={guiaData}
            setContent={setContent}
            setResponseData={setResponseData}
            setRefreshTable={props.setRefreshTable}
          />
        );
      case "RESULT":
        return <Result responseData={responseData} />;
    }
  };

  useEffect(() => {
    /** Traemos datos de tramite cuando abrimos dialog */
    if (props.showDialog) {
      getGuiaData(props.idGuia);
    }
  }, [props.showDialog]);

  return (
    <Dialog
      header={`Cerrar Guía`}
      visible={props.showDialog}
      onHide={props.onHideDialog}
      style={{ width: "80vw" }}
      position="center"
      draggable={false}
      closable={content != "LOADING"}
    >
      {evalContent()}
    </Dialog>
  );
}
