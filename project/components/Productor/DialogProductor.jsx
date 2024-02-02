import { Dialog } from "primereact/dialog";
import FormProductor from "./FormProductor";

export default function DialogProductor(props) {
  const onHideForm = () => {
    props.setShowForm(false);
  };

  return (
    <Dialog
      header={"Datos Productor"}
      visible={props.showForm}
      style={{ width: "80vw" }}
      footer={null}
      onHide={onHideForm}
      position={"center"}
    >
      <FormProductor onHideForm={onHideForm} />
    </Dialog>
  );
}
