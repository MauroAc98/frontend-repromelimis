import { Dialog } from "primereact/dialog";
import LazyTable from "@/base/components/Table/LazyTable";
import { Button } from "primereact/button";

export default function DialogLupa(props) {
  const footer = (
    <>
      <Button
        type="button"
        label="Seleccionar"
        className="p-button-sm p-button-primary mr-2"
        onClick={props.onSelect}
      />
      <Button
        type="button"
        label="Limpiar"
        className="p-button-sm p-button-secondary mr-2"
        onClick={props.onClean}
      />
      <Button
        type="button"
        label="Cancelar"
        className="p-button-sm p-button-danger"
        onClick={props.onHideDialog}
      />
    </>
  );

  return (
    <>
      <Dialog
        header={props.title}
        visible={props.showDialog}
        style={{ width: "80vw" }}
        footer={footer}
        onHide={props.onHideDialog}
        position={"center"}
      >
        <LazyTable
          columns={props.columns}
          pageSize={5}
          url={props.url}
          params={props.params}
          selectionMode={"single"}
          selection={props.selection}
          onSelectionChange={(e) => props.setSelection(e.value)}
          showGeneralSearch
        />
      </Dialog>
    </>
  );
}
