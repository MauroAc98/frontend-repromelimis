import styles from "./HeaderCerrarGuia.module.css";
import { formatDate } from "@/base/helpers/utils";

export default function HeaderCerrarGuia({
  nro,
  motivoSolicitud,
  fechaVencimiento,
}) {
  const evalMotivo = () => {
    if (motivoSolicitud == "MELIPONARIO_A_MELIPONARIO") {
      return "MELIPONARIO A MELIPONARIO";
    }
    return "RESCATE A ESPACIO PUBLICO";
  };
  return (
    <div className="pb-3">
      <div
        className={[
          "flex flex-column lg:flex-row justify-content-start gap-4 lg:gap-7",
          styles["panel"],
        ].join(" ")}
      >
        <div className="">
          <i className="pi pi-hashtag text-md font-bold mr-2"></i>
          <span className="text-md font-bold">
            N° Guía: <span className="font-normal">{nro}</span>
          </span>
        </div>
        <div className="">
          <i className="pi pi-bookmark text-md font-bold mr-2"></i>
          <span className="text-md">
            <span className="font-bold">Motivo: </span>
            <span className="font-normal">
              {evalMotivo()}
            </span>
          </span>
        </div>
        <div className="">
          <i className="pi pi-calendar text-md font-bold mr-2"></i>
          <span className="text-md">
            <span className="font-bold">Fecha Vencimiento: </span>
            <span className="font-normal">
              {formatDate("dd/mm/yyyy", fechaVencimiento)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
