import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
export default function SimpleDialogForm(props) {
  const footer = (
    <>
      <Button
        type="button"
        label="Guardar"
        className="p-button-sm p-button-success mr-2"
        onClick={props.onSubmit}
      />
      <Button
        type="button"
        label="Cancelar"
        className="p-button-sm p-button-danger"
        onClick={props.onCancel}
      />
    </>
  );

  return (
    <Dialog
      header={props.title}
      visible={props.showForm}
      style={{ width: props.width }}
      footer={footer}
      onHide={props.onHide}
      position={props.position}
    >
      <div className="grid mt-2">{props.content}</div>
    </Dialog>
  );
}
