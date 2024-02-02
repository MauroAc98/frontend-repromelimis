import styles from "./unauthorizedPage.module.css";
import { Button } from "primereact/button";
import Link from "next/link";
export default function UnauthorizedPage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>401</div>
      <div className={styles["message"]}>No esta autorizado para ver esta sección.</div>
      <div className="mt-4">
        <Link href={"/"}>
          <Button label="Volver al inicio" className="p-button-secondary" />
        </Link>
      </div>
    </div>
  );
}
