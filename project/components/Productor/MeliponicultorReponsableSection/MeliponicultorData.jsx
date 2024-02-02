import styles from "./MeliponicultorData.module.css";
import { formatDate } from "@/base/helpers/utils";
import { maskNroRepromelimis } from "@/project/helpers/utils";

export default function MeliponicultorData({
  productor_responsable,
  setFormData,
}) {
  const evalRegistro = () => {
    if (productor_responsable?.repromelimis?.vencido) {
      return (
        <div>
          <i className="pi pi-times-circle mr-2 text-red-600 font-bold text-xl"></i>
          <span className="font-bold text-red-600">Registro vencido</span>
        </div>
      );
    }

    return (
      <div>
        <i className="pi pi-check-circle mr-2 text-green-600 font-bold text-xl"></i>
        <span className="font-bold text-green-600">Registro vigente</span>
      </div>
    );
  };

  const removeData = () => {
    setFormData((prevVal) => ({
      ...prevVal,
      productor_responsable: null,
    }));
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
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Estado registro</div>
          {evalRegistro()}
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">N° ReProMeliMis</div>
          <div>
            {maskNroRepromelimis(
              productor_responsable.repromelimis?.nro_repromelimis
            )}
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Fecha Vencimiento</div>
          <div>
            {formatDate(
              "dd/mm/yyyy",
              productor_responsable.repromelimis?.fecha_vencimiento
            )}
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">CUIT/CUIL</div>
          <div>{productor_responsable.cuit}</div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Apellido</div>
          <div>{productor_responsable.apellido}</div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="font-bold mb-2">Nombres</div>
          <div>{productor_responsable.nombres}</div>
        </div>
      </div>
    </div>
  );
}
