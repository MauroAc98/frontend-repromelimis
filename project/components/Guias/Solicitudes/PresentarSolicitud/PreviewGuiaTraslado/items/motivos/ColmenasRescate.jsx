import CustomTable from "@/base/components/Table/CustomTable";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import { Image } from "primereact/image";
import { SITIOS_GUIAS } from "@/pages/guias-traslado/solicitudes";

export default function ColmenasRescate({ movimientos }) {
  const getSitioTraslado = (rowData) => {
    const { label } = SITIOS_GUIAS.find(
      (item) => item.value == rowData.sitio_traslado
    );
    return label;
  };

  const columns = [
    {
      field: "especie_rescate",
      header: "Especie - Nombre Comun",
      body: (rowData) =>
        rowData.especie_rescate
          ? `${rowData.especie_rescate.nombre} - ${rowData.especie_rescate.nombre_comun}`
          : "Sin especie",
      style: { minWidth: "300px" },
    },
    {
      field: "colmena_instalada_tronco",
      header: "Colmena instalada en sección de tronco, tora, torita?",
      align: "center",
      body: (rowData) => (rowData.colmena_instalada_tronco ? "Si" : "No"),
      style: { minWidth: "300px" },
    },
    {
      field: "lugar_instalada",
      header: "Lugar Instalada",
      align: "center",
      body: (rowData) =>
        rowData.lugar_instalada ? rowData.lugar_instalada : " ",
    },
    {
      field: "largo_seccion",
      header: "Largo Seccion",
      align: "center",
      body: (rowData) => `${rowData.largo_seccion} cm`,
    },
    {
      field: "sitio_traslado",
      header: "Sitio de la colmena a trasladar",
      align: "center",
      body: getSitioTraslado,
      style: { minWidth: "300px" },
    },
    {
      field: "foto_colmena",
      header: "Foto de colmena",
      align: "center",
      body: (rowData) => (
        <Image
          src={rowData.foto_colmena.original_url}
          alt="Image"
          width="100"
          preview
        />
      ),
      style: { minWidth: "200px" },
    },
    {
      field: "foto_panoramica",
      header: "Foto panoramica",
      align: "center",
      body: (rowData) => (
        <Image
          src={rowData.foto_panoramica?.original_url}
          alt="Image"
          width="100"
          preview
        />
      ),
      style: { minWidth: "200px" },
    },
  ];

  return (
    <>
      <CustomTable hidePaginator={true} columns={columns} data={movimientos} />
    </>
  );
}
