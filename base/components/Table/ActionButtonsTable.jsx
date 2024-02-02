import usePermission from "@/base/hooks/usePermission";
import { Button } from "primereact/button";
export default function ActionButtonsTable(props) {
  const { checkPermission } = usePermission();

  return (
    <>
      <div className="flex justify-content-center gap-2"> 
        {checkPermission(props.checkEdit) &&
          typeof props?.handleClickEdit === "function" && (
            <Button
              tooltip="Editar"
              className="p-button-sm p-button-outlined p-button-secondary"
              icon="pi pi-pencil"
              onClick={props.handleClickEdit}
            />
          )}

        {checkPermission(props.checkDel) &&
          typeof props?.handleClickDelete === "function" && (
            <Button
              tooltip="Eliminar"
              className="p-button-sm p-button-outlined p-button-secondary"
              icon="pi pi-trash"
              onClick={props.handleClickDelete}
            />
          )}
        {props.moreButtons}
      </div>
    </>
  );
}
