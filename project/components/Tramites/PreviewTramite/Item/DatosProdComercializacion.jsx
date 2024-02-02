import React from "react";
import CustomTable from "@/base/components/Table/CustomTable";
const DatosProdComercializacion = ({ data: { producto_comercializacion } }) => {
  const cantidadTemplate = (rowData) => {
    let unidad_medida = "";
    switch (rowData.producto.unidad_medida) {
      case "GR":
        unidad_medida = "(Gramos)";
        break;
      case "U":
        unidad_medida = "(Unidades)";
        break;
    }
    return `${rowData.cantidad} ${unidad_medida}`;
  };

  const columns = [
    {
      field: "producto.nombre_producto",
      header: "Producto",
      align: "left",
    },
    {
      field: "cantidad",
      header: "Cantidad",
      align: "center",
      body: cantidadTemplate,
    },
    {
      field: "tipo_comercializacion",
      header: "Tipo Comercialización",
      align: "center",
    },
  ];
  return (
    <CustomTable
    hidePaginator={true}
      hideHeader={true}
      columns={columns}
      data={producto_comercializacion}
    />
  );
};

export default DatosProdComercializacion;
