import usePermission from "@/base/hooks/usePermission";
import { Button } from "primereact/button";

export default function ButtonsSection(props) {
  const { checkPermission } = usePermission();

  return (
    <>
      {checkPermission(props.checkAdd) &&
        typeof props?.handleClickAdd === "function" && (
          <Button
            label={props.titleAdd ?? "Crear"}
            className="p-button-sm p-button-success mr-2"
            icon="pi pi-plus"
            onClick={props.handleClickAdd}
          />
        )}
      {checkPermission(props.checkImport) &&
        typeof props?.handleClickImport === "function" && (
          <Button
            label="Importar"
            className="p-button-sm p-button-outlined p-button-success mr-2"
            icon="pi pi-file-excel"
            onClick={props.handleClickImport}
          />
        )}
      {props.moreButtons}
    </>
  );
}
