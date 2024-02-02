import React from "react";
import CustomTable from "@/base/components/Table/CustomTable";
const DatosActComplementarias = ({ data: { actividades_complementarias } }) => {
  const columns = [
    {
      field: "tipo_actividad",
      header: "Tipo Actividad",
      align: "left",
    },
    {
      field: "actividad",
      header: "Actividad",
      align: "center",
    },
    {
      field: "descripcion",
      header: "Descripcion",
      align: "center",
    },
  ];
  return (
    <CustomTable
      showPaginator={false}
      hideHeader={true}
      columns={columns}
      data={actividades_complementarias}
    />
  );
};

export default DatosActComplementarias;
