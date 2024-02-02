import { Dialog } from "primereact/dialog";

export default function DialogVerDatos(props) {
  const onHideDialog = () => {
    props.onHideDialog();
  };

  return (
    <>
      <Dialog
        header={props.title}
        visible={props.showDialog}
        style={{ width: "50vw" }}
        footer={null}
        onHide={onHideDialog}
        position={"center"}
      >
        <div className="grid mt-3">
          <div className="col-12 md:col-4 mt-3">
            <label className="font-bold">N°</label>
            <div className="mt-1">
              {props.colmenaData?.nro}
            </div>
          </div>
          <div className="col-12 md:col-4 mt-3">
            <label className="font-bold">Tipo de colmena</label>
            <div className="mt-1">
              {props.colmenaData?.tipo_colmena}
            </div>
          </div>
          <div className="col-12 md:col-4 mt-3">
            <label className="font-bold">Cantidad actual</label>
            <div className="mt-1">
              {props.colmenaData?.cantidad_actual}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
