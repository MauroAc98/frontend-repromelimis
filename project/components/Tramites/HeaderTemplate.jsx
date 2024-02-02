import { useTramiteContext } from "@/project/context/TramiteContext";
import styles from "./HeaderTemplate.module.css";
import { useEffect } from "react";
import { formatDate } from "@/base/helpers/utils";

export default function HeaderTemplate() {
  const { datosTramite } = useTramiteContext();

  return (
    <div className="pb-3 sm:pb-5">
      <div
        className={[
          "flex flex-column lg:flex-row justify-content-start gap-4 lg:gap-7",
          styles["panel"],
        ].join(" ")}
      >
        <div className="">
          <i className="pi pi-bookmark text-md font-bold mr-2"></i>
          <span className="text-md">
            <span className="font-bold">{datosTramite?.tipo_tramite}</span>
          </span>
        </div>
        <div className="">
          <i className="pi pi-hashtag text-md font-bold mr-2"></i>
          <span className="text-md font-bold">
            N° Trámite: <span className="font-normal">{datosTramite?.nro}</span>
          </span>
        </div>
        {datosTramite?.repromelimis_actual && (
          <>
            <div className="">
              <i className="pi pi-hashtag text-md font-bold mr-2"></i>
              <span className="text-md font-bold">
                N° ReProMeliMis:{" "}
                <span className="font-normal">
                  {datosTramite.repromelimis_actual.nro_repromelimis}
                </span>
              </span>
            </div>
            <div className="">
              <i className="pi pi-calendar text-md font-bold mr-2"></i>
              <span className="text-md font-bold">
                Ult. actualización:{" "}
                <span className="font-normal">
                  {formatDate(
                    "dd/mm/yyyy",
                    datosTramite.repromelimis_actual.fecha_ultima_actualizacion
                  )}
                </span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
