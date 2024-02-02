import styles from "@/base/components/UnauthorizedPage/unauthorizedPage.module.css";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className={styles["container"]}>
            <div className={styles["title"]}>404</div>
            <div className={styles["message"]}>Página no encontrada.</div>
            <div className="mt-4">
                <Link href={"/"}>
                    <Button label="Volver al inicio" className="p-button-secondary" />
                </Link>
            </div>
        </div>
    );
}
