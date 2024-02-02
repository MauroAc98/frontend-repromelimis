import styles from "./Colmenas.module.css";

export default function HeaderColmenas(props) {
    
  return (
    <div className={[styles["panel"], "mb-3"].join(" ")}>
      <div className="">
        <i className="pi pi-hashtag text-lg font-bold mr-2"></i>
        <span className="text-lg font-bold">
          Cantidad actual: <span className="font-normal">{props?.cantidadActual}</span>
        </span>
      </div>
    </div>
  );
}
