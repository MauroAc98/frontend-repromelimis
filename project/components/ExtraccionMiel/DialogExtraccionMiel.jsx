import { Dialog } from "primereact/dialog";
import FormExtraccionMiel from "./FormExtraccionMiel";

export default function DialogExtraccionMiel(props) {
  const onHideForm = () => {
    props.setShowForm(false);
    props.setExtraccionData(null);
  };

  return (
    <Dialog
      header={"Nueva Extracción de miel"}
      visible={props.showForm}
      style={{ width: "80vw" }}
      footer={null}
      onHide={onHideForm}
      position={"center"}
    >
      <FormExtraccionMiel
        submitAction={props.submitAction}
        showForm={props.showForm}
        onHideForm={onHideForm}
        extraccionData={props.extraccionData}
      />
    </Dialog>
  );
}
