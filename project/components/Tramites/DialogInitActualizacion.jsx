import { formatDate } from "@/base/helpers/utils";
import { Dialog } from "primereact/dialog";

export default function DialogInitActualizacion({
  dialogInitActualizacion,
  setDialogInitActualizacion,
}) {
  return (
    <Dialog
      header={""}
      visible={dialogInitActualizacion.show}
      onHide={() =>
        setDialogInitActualizacion({
          show: false,
          repromelimisData: {},
        })
      }
      style={{ width: "40vw" }}
      position="center"
      draggable={false}
    >
      <>
        <div className="text-center">
          <i
            className="pi pi-check-circle text-green-600"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>
        <div className="text-center mt-2 mb-3">
          <h2>Realizado!</h2>
        </div>
        <p>
          Trámite de actualización creado con exito! Se han traido los datos de
          su registro de ReProMeliMis actual &nbsp;
          <span className="font-bold">
            (ultima actualización&nbsp;
            {formatDate(
              "dd/mm/yyyy",
              dialogInitActualizacion.repromelimisData
                .fecha_ultima_actualizacion
            )}
            )
          </span>
          , modifiquelos de ser necesario y luego presente el trámite.
        </p>
      </>
    </Dialog>
  );
}
