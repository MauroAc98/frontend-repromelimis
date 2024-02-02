import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import useCustomForm from "@/base/hooks/useCustomForm";
import ViewDireccion from "@/base/components/Direccion/ViewDireccion";
export default function DialogDireccion(props) {
  const { formData, setFormData } = useCustomForm();

  useEffect(() => {
    setFormData(props.data);
  }, [props.data]);

  return (
    <Dialog
      header={`Dirección ${props.title ?? ""}`}
      visible={props.show}
      onHide={props.onHide}
      style={{ width: "60vw" }}
      position="center"
      draggable={false}>
      <div className="grid p-3">
        <ViewDireccion
          inputValue={formData}
        />
      </div>
    </Dialog>
  );
}
