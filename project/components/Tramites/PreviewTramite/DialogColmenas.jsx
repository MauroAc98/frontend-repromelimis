import CustomTable from "@/base/components/Table/CustomTable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import DialogMovimientos from "./DialogMovimientos";
import { useState } from "react";

export default function DialogColmenas(props) {
  const [movimientosData, setMovimientosData] = useState({
    show: false,
    title: "Movimientos de colmenas",
    data: null,
  });

  const especieTemplate = (rowData) => {
    if (rowData.id_especie) {
      return `${rowData.especie.nombre} - ${rowData.especie.nombre_comun}`;
    }
    return `${rowData.descripcion_especie} - ${rowData.descripcion_nombre_comun}`;
  };

  const estadoTemplate = (rowData) => {
    if (rowData.estado == "ACTIVO") {
      return <Tag severity="success" value={rowData.estado} />;
    }
    return <Tag severity="danger" value={rowData.estado} />;
  };

  const tipoColmenaTemplate = (rowData) => {
    return <Tag value={rowData.tipo_colmena} />;
  };

  const actionButtons = (rowData) => {
    return (
      <>
        <Button
          label="Ver movimientos"
          onClick={() => onClickMov(rowData)}
          className="p-button-outlined mr-2"
          icon="pi pi-sort-alt"
        />
      </>
    );
  };

  const onClickMov = (data) => {
    setMovimientosData({
      title: `Movimientos de Colmena N° ${data.nro}`,
      data: data.movimientos_colmena,
      show: true,
    });
  };

  const columns = [
    {
      field: "nro",
      header: "N°",
    },
    {
      field: "especie",
      header: "Especie - Nombre Comun",
      body: especieTemplate,
    },
    {
      field: "descripcion",
      header: "Descripcion",
    },
    {
      field: "tipo_colmena",
      header: "Tipo de colmena",
      body: tipoColmenaTemplate,
      align: "center",
    },
    {
      field: "cantidad_actual",
      header: "Cantidad actual",
      align: "center",
    },
    {
      field: "estado",
      header: "Estado",
      body: estadoTemplate,
      align: "center",
    },
    {
      field: "action_buttons",
      header: "Acción",
      body: actionButtons,
      align: "center",
    },
  ];

  return (
    <>
      {movimientosData.show && (
        <DialogMovimientos
          show={movimientosData.show}
          data={movimientosData.data}
          title={movimientosData.title}
          onHide={() => setMovimientosData({ ...movimientosData, show: false })}
        />
      )}
      <Dialog
        header={`${props.title ?? ""}`}
        visible={props.show}
        onHide={props.onHide}
        style={{ width: "60vw" }}
        position="center"
        draggable={false}
      >
        <CustomTable hidePaginator={true} columns={columns} data={props.data} />
      </Dialog>
    </>
  );
}
