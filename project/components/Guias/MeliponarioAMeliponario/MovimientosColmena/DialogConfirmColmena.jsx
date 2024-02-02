import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { useState } from "react";
import CustomTable from "@/base/components/Table/CustomTable";
import { Button } from "primereact/button";

export default function DialogConfirmColmena(props) {

  const onHideDialog = () => {
    props.setShowDialog(false);
  };

  return (
    <>
      <Dialog
        header={"Confirmar datos"}
        visible={props.showDialog}
        style={{ width: "50vw" }}
        footer={null}
        onHide={onHideDialog}
        position={"center"}
      >
        {JSON.stringify(props.colmenaData)}
      </Dialog>
    </>
  );
}
