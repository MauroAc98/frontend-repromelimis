import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import SectionLoader from "@/base/components/Loader/SectionLoader";
import { Content } from "./Content";
import { Result } from "./Result";
import useGetTramiteData from "@/project/hooks/endpointsHooks/useGetTramiteData";
import Preview from "../PreviewTramite/Preview";
import { useTramiteContext } from "@/project/context/TramiteContext";

export default function DialogPresentarTramite(props) {
  const [content, setContent] = useState("LOADING");
  const [responseData, setResponseData] = useState({
    status: null,
    message: null,
    errors: [],
  });

  const [tramiteData, setTramiteData] = useState(null);
  /** GET TRAMITE DATA */
  const { getTramiteData } = useGetTramiteData(
    onBeforeGetTramiteData,
    onSuccessGetTramiteData,
    null
  );

  function onBeforeGetTramiteData() {
    setTramiteData(null);
    setContent("LOADING");
  }

  function onSuccessGetTramiteData(data) {
    setTramiteData(data);
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
            <Preview data={tramiteData} />
            <Content
              setRefreshTable={props.setRefreshTable}
              setContent={setContent}
              setResponseData={setResponseData}
              tramiteData={tramiteData}
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
      getTramiteData(props.idTramite);
    }
  }, [props.showDialog]);

  return (
    <Dialog
      header={`Presentar Trámite ${tramiteData?.nro ?? ""}`}
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
