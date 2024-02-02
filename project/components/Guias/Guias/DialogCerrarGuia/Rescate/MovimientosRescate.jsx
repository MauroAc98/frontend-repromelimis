import CustomTable from "@/base/components/Table/CustomTable";
import { SITIOS_GUIAS } from "@/pages/guias-traslado/solicitudes";

export default function MovimientosRescate(props) {
  const getSitioTraslado = (rowData) => {
    const { label } = SITIOS_GUIAS.find(
      (item) => item.value == rowData.sitio_traslado
    );

    return label;
  };

  const getEspecie = (rowData) => {
    if (rowData.id_especie_rescate) {
      return `${rowData?.especie_rescate?.nombre} - ${rowData?.especie_rescate?.nombre_comun}`;
    }
    return "";
  };

  const columns = [
    {
      field: "especie",
      header: "Especie - Nombre Comun",
      body: getEspecie,
      style: { minWidth: "300px" },
    },
    {
      field: "colmena_instalada_tronco",
      header: "Colmena instalada en sección de tronco, tora, torita?",
      body: (rowData) => `${rowData.colmena_instalada_tronco ? "SI" : "NO"}`,
      style: { minWidth: "300px" },
    },
    {
      field: "sitio_traslado",
      header: "Sitio",
      align: "left",
      body: getSitioTraslado,
      style: { minWidth: "300px" },
    },
    {
      field: "lugar_instalada",
      header: "Lugar",
      align: "left",
      style: { minWidth: "300px" },
    },
    {
      field: "largo_seccion",
      header: "Largo sección",
      align: "left",
      body: (rowData) => `${rowData.largo_seccion} cm`,
      style: { minWidth: "300px" },
    },
  ];

  return (
    <>
      <h3 className="mb-2">Movimientos</h3>
      <CustomTable
        hideHeader={true}
        hidePaginator={true}
        columns={columns}
        data={props.movimientos}
      />
    </>
  );
}
