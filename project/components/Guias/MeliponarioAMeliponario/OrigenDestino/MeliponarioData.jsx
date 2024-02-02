import styles from "./MeliponarioData.module.css";
import { maskNroRepromelimis } from "@/project/helpers/utils";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
export default function MeliponarioData({
  meliponarioData,
  setFormData,
  type,
}) {
  const { datosSolicitud } = useSolicitudGuiaContext();

  /** Accion de boton X */
  const removeData = () => {
    if (type == "ORIGEN") {
      setFormData((prevVal) => ({
        ...prevVal,
        meliponario_origen: null,
      }));
    } else if (type == "DESTINO") {
      setFormData((prevVal) => ({
        ...prevVal,
        meliponario_destino: null,
      }));
    }
  };

  /** Evaluamos si mostrar la X */
  const evalShowX = () => {
    if (
      !datosSolicitud.id_meliponario_origen &&
      !datosSolicitud.id_meliponario_destino
    ) {
      return (
        <div className={styles["div_x"]}>
          <i
            onClick={removeData}
            className={["pi pi-times cursor-pointer", styles["icon_x"]].join(
              " "
            )}
          ></i>
        </div>
      );
    }

    return <></>;
  };

  const getProductor = () => {
    const { productor } = meliponarioData.repromelimis;
    if (productor?.persona_juridica) {
      return productor?.razon_social;
    }
    return `${productor?.apellido} ${productor?.nombres}`;
  };

  return (
    <div className={["mt-4", styles["div_data"]].join(" ")}>
      {evalShowX()}

      <div className="grid">
        {type == "DESTINO" && (
          <>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">N° ReProMeliMis</div>
              <div>
                {maskNroRepromelimis(
                  meliponarioData.repromelimis?.nro_repromelimis
                )}
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Productor</div>
              <div>{getProductor()}</div>
            </div>
          </>
        )}

        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">N° Meliponario</div>
          <div>{meliponarioData.nro}</div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Tipo de producción</div>
          <div>
            {meliponarioData.tipo_produccion == "CONVENCIONAL"
              ? "CONVENCIONAL"
              : "AGRO ECOLOGICA"}
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Departamento</div>
          <div>{meliponarioData.direccion.departamento.nombre}</div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Localidad</div>
          <div>{meliponarioData.direccion.localidad.nombre}</div>
        </div>
      </div>
    </div>
  );
}
