import React, { useState } from "react";
import CustomTable from "@/base/components/Table/CustomTable";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import DialogDireccion from "@/base/components/Direccion/DialogDireccion";
import DialogColmenas from "../DialogColmenas";


const DatosMeliponarios = ({ data: { meliponarios } }) => {
  const [dialogDireccion, setDialogDireccion] = useState({
    show: false,
    title: "",
    direccionData: null,
  });

  const [dialogColmenas, setDialogColmenas] = useState({
    show: false,
    title: `Colmenas de Meliponario N° ${meliponarios[0].nro}`,
    direccionData: null,
  });

  const cantidadColmenasTemplate = (rowData) => {
    return (
      <>
        {rowData.cant_colmenas_rusticas && (
          <div>
            <Tag
              className="mb-1"
              severity="success"
              value={`Rústicas: ${rowData.cant_colmenas_rusticas}`}
            />
          </div>
        )}

        {rowData.cant_colmenas_tecnificadas && (
          <div>
            <Tag
              className="mb-1"
              severity="info"
              value={`Tecnificadas: ${rowData.cant_colmenas_tecnificadas}`}
            />
          </div>
        )}

        {rowData.cant_colmenas_naturales && (
          <div>
            <Tag
              className="mb-1"
              severity="warning"
              value={`Naturales: ${rowData.cant_colmenas_naturales}`}
            />
          </div>
        )}
      </>
    );
  };

  const viewDirection = (data) => {
    setDialogDireccion({
      show: true,
      direccionData: data,
      title: "Meliponario",
    });
  };

  const viewColmenas = (data) => {
    setDialogColmenas({
      ...dialogColmenas,
      show: true,
      colmenasData: data,
    });
  };

  const actionButtons = ({ direccion, colmenas }) => {

    return (
      <>
        <Button
          label="Ver dirección"
          onClick={() => viewDirection(direccion)}
          className="p-button-outlined mr-2"
          icon="pi pi-map-marker"
        />
        <Button
          label="Ver colmenas"
          onClick={() => viewColmenas(colmenas)}
          className="p-button-outlined"
          icon="pi pi-home"
        />
      </>

    );
  };

  const tipoProduccionTemplate = (rowData) => {
    if (rowData.tipo_produccion == "CONVENCIONAL") {
      return <Tag className="mb-1" value="CONVENCIONAL" />;
    }
    return <Tag className="mb-1" value="AGRO ECOLOGICA" />;
  };

  const columns = [
    {
      field: "nro",
      header: "N°",
      align: "center",
    },
    {
      field: "tipo_produccion",
      header: "Tipo Producción",
      align: "center",
      body: tipoProduccionTemplate,
    },
    {
      field: "nro_sucp",
      header: "N° SUCP",
    },
    {
      field: "action_buttons",
      header: "Acciones",
      align: "center",
      body: actionButtons,
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
      {dialogColmenas.show && (
        <DialogColmenas
          show={dialogColmenas.show}
          data={dialogColmenas.colmenasData}
          title={dialogColmenas.title}
          onHide={() => setDialogColmenas({ ...dialogColmenas, show: false })}
        />
      )}
      <CustomTable
        hidePaginator={true}
        hideHeader={true}
        columns={columns}
        data={meliponarios}
      />
    </>
  );
};

export default DatosMeliponarios;
