import styles from "./OrigenDestinoRescate.module.css";
import ViewDireccion from "@/base/components/Direccion/ViewDireccion";

export default function OrigenDestinoRescate(props) {
  return (
    <div className="grid">
      {/* ORIGEN */}
      <div className="col-12">
        <h3>Origen</h3>
        <div className={["mt-3", styles["div_data"]].join(" ")}>
          <div className="grid">
            <ViewDireccion inputValue={props.guiaData.direccion_origen} />
          </div>
        </div>
      </div>

      {/* DESTINO */}
      <div className="col-12">
        <h3>Destino</h3>
        <div className={["mt-3", styles["div_data"]].join(" ")}>
          <div className="grid">
            <ViewDireccion inputValue={props.guiaData.direccion_destino} />
          </div>
        </div>
      </div>
    </div>
  );
}
