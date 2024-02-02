import styles from "./OrigenDestinoMeliAMeli.module.css";
import { maskNroRepromelimis } from "@/project/helpers/utils";

export default function OrigenDestinoMeliAMeli(props) {
  const getProductor = () => {
    const { productor } = props.guiaData.meliponario_destino.repromelimis;
    if (productor.persona_juridica) {
      return productor.razon_social;
    }
    return `${productor.apellido} ${productor.nombres}`;
  };
  return (
    <div className="grid">
      {/* ORIGEN */}
      <div className="col-12 lg:col-6">
        <h3>Origen</h3>
        <div className={["mt-3", styles["div_data"]].join(" ")}>
          <div className="grid">
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">N° Meliponario</div>
              <div>{props.guiaData.meliponario_origen.nro}</div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Tipo de producción</div>
              <div>
                {props.guiaData.meliponario_origen.tipo_produccion ==
                "CONVENCIONAL"
                  ? "CONVENCIONAL"
                  : "AGRO ECOLOGICA"}
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Departamento</div>
              <div>
                {
                  props.guiaData.meliponario_origen.direccion.departamento
                    .nombre
                }
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Localidad</div>
              <div>
                {props.guiaData.meliponario_origen.direccion.localidad.nombre}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESTINO */}
      <div className="col-12 lg:col-6">
        <h3>Destino</h3>
        <div className={["mt-3", styles["div_data"]].join(" ")}>
          <div className="grid">
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">N° ReProMeliMis</div>
              <div>
                {maskNroRepromelimis(
                  props.guiaData.meliponario_destino.repromelimis
                    ?.nro_repromelimis
                )}
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Productor</div>
              <div>{getProductor()}</div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">N° Meliponario</div>
              <div>{props.guiaData.meliponario_destino.nro}</div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Tipo de producción</div>
              <div>
                {props.guiaData.meliponario_destino.tipo_produccion ==
                "CONVENCIONAL"
                  ? "CONVENCIONAL"
                  : "AGRO ECOLOGICA"}
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Departamento</div>
              <div>
                {
                  props.guiaData.meliponario_destino.direccion.departamento
                    .nombre
                }
              </div>
            </div>
            <div className="col-12 lg:col-4">
              <div className="font-bold mb-2">Localidad</div>
              <div>
                {props.guiaData.meliponario_destino.direccion.localidad.nombre}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
