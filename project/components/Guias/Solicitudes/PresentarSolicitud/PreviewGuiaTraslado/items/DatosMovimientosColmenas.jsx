import ColmenasRescate from "./motivos/ColmenasRescate";
import ColmenasMeliponarios from "./motivos/ColmenasMeliponarios";

export default function DatosMovimientosColmenas({ data }) {
  return (
    <>
      {data.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO" ? (
        <ColmenasMeliponarios movimientos={data.movimientos} />
      ) : (
        <ColmenasRescate movimientos={data.movimientos} />
      )}
    </>
  );
}
