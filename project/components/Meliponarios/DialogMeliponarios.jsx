import { Dialog } from "primereact/dialog";
import FormMeliponarios from "./FormMeliponarios";

export default function DialogMeliponarios(props) {
  const onHideForm = () => {
    props.setShowForm(false);
    props.setMeliData(null);
  };

  return (
    <Dialog
      header={
        props.submitAction == "add" ? "Nuevo Meliponario" : "Editar Meliponario"
      }
      visible={props.showForm}
      style={{ width: "80vw" }}
      footer={null}
      onHide={onHideForm}
      position={"center"}
    >
      <FormMeliponarios
        submitAction={props.submitAction}
        showForm={props.showForm}
        meliData={props.meliData}
        onHideForm={onHideForm}
      />
    </Dialog>
  );
}
