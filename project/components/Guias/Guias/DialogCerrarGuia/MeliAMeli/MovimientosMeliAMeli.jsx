import CustomTable from "@/base/components/Table/CustomTable";

export default function MovimientosMeliAMeli(props) {
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
