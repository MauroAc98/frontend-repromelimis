import React, { useState } from "react";
import CustomTable from "@/base/components/Table/CustomTable";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import DialogDireccion from "@/base/components/Direccion/DialogDireccion";

const DatosExtraccionMiel = ({ data: { extraccion_miel } }) => {
  const [dialogDireccion, setDialogDireccion] = useState({
    show: false,
    title: "",
    direccionData: null,
  });

  const HabilitacionTemplate = (rowData) => {
    return <Tag value={rowData.habilitada ? "SI" : "NO"} />;
  };

  const actionButton = ({ direccion }) => {
    return (
      <Button
        label="Ver dirección"
        onClick={() => viewDirection(direccion)}
        className="p-button-outlined"
        icon="pi pi-map-marker"
      />
    );
  };

  const viewDirection = (data) => {
    setDialogDireccion({
      show: true,
      direccionData: data,
      title: "Extracción Miel",
    });
  };

  const columns = [
    {
      field: "propietario",
      header: "Propietario",
      align: "left",
    },
    {
      field: "habilitada",
      header: "Habilitada",
      align: "center",
      body: HabilitacionTemplate,
    },
    {
      field: "action_buttons",
      header: "Acción",
      align: "center",
      body: actionButton,
    },
  ];

  return (
    <>
      {dialogDireccion.show && (
        <DialogDireccion
          show={dialogDireccion.show}
          data={dialogDireccion.direccionData}
          title={dialogDireccion.title}
          onHide={() => setDialogDireccion({ ...dialogDireccion, show: false })}
        />
      )}
      <CustomTable
        hidePaginator={true}
        hideHeader={true}
        columns={columns}
        data={extraccion_miel}
      />
    </>
  );
};

export default DatosExtraccionMiel;
