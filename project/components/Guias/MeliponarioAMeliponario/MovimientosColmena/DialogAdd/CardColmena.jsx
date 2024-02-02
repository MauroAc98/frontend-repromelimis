import styles from "./CardColmena.module.css";

export default function CardColmena({ colmenaData, setFormData, type }) {
  /** Accion de boton X */
  const removeData = () => {
    if (type == "ORIGEN") {
        setFormData(null);
    } else if (type == "DESTINO") {
        setFormData((prevVal) => ({
          ...prevVal,
          colmena_destino: null,
          cantidad_a_trasladar: null,
          foto_colmena: null
        }));
    }
  };

  return (
    <div className={["mt-4", styles["div_data"]].join(" ")}>
      <div className={styles["div_x"]}>
        <i
          onClick={removeData}
          className={["pi pi-times cursor-pointer", styles["icon_x"]].join(" ")}
        ></i>
      </div>

      <div className="grid">
        <div className="col-12 lg:col-2">
          <div className="font-bold mb-2">N°</div>
          <div>{colmenaData.nro}</div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Especie - Nombre Comun</div>
          <div>{`${colmenaData.especie.nombre} - ${colmenaData.especie.nombre_comun}`}</div>
        </div>
        <div className="col-12 lg:col-3">
          <div className="font-bold mb-2">Tipo de colmena</div>
          <div>{colmenaData.tipo_colmena}</div>
        </div>
        <div className="col-12 lg:col-3">
          <div className="font-bold mb-2">Cantidad actual</div>
          <div>{colmenaData.cantidad_actual}</div>
        </div>
      </div>
    </div>
  );
}
