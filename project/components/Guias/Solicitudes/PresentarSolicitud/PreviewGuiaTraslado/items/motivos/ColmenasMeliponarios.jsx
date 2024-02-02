import CustomTable from "@/base/components/Table/CustomTable";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

export default function ColmenasMeliponarios({ movimientos }) {
  const datosColmena = (colmenaData) => {
    return (
      <div>
        <div className="">
          <div>
            <span className="font-bold">N°: </span>
            <span>{colmenaData?.nro}</span>
          </div>
          <div>
            <span className="font-bold">Tipo de colmena: </span>
            <span>{colmenaData?.tipo_colmena}</span>
          </div>
          <div>
            <span className="font-bold">Cantidad actual: </span>
            <span>{colmenaData?.cantidad_actual}</span>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      field: "especie",
      header: "Especie - Nombre Comun",
      body: (rowData) =>
        `${rowData.colmena_origen.especie.nombre} - ${rowData.colmena_origen.especie.nombre_comun}`,
      style: { minWidth: "300px" },
    },
    {
      field: "datos_colmena_origen",
      header: "Datos Colmena Origen",
      align: "left",
      body: (rowData) => datosColmena(rowData.colmena_origen),
      style: { minWidth: "300px" },
    },
    {
      field: "datos_colmena_destino",
      header: "Datos Colmena Destino",
      align: "left",
      body: (rowData) => datosColmena(rowData.colmena_destino),
      style: { minWidth: "300px" },
    },
    {
      field: "cantidad_a_trasladar",
      header: "Cantidad a trasladar",
      align: "center",
      style: { minWidth: "200px" },
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
  ];
  return (
    <>
      <CustomTable
        hidePaginator={true}
        columns={columns}
        data={movimientos}
      />
    </>
  );
}
