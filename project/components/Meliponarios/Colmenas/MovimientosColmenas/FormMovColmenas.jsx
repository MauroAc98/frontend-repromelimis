import { Dialog } from "primereact/dialog";
import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useCustomForm from "@/base/hooks/useCustomForm";
import useGetEspecies from "@/project/hooks/endpointsHooks/useGetEspecies";
import { useEffect, useState } from "react";
import SectionLoader from "@/base/components/Loader/SectionLoader";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import api, { getResponseError } from "@/base/helpers/api";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "@/base/components/Form/InputNumber";

export default function FormMovColmenas(props) {
  const {
    formData,
    setFormData,
    handleFormChange,
    formErrors,
    handleSetFormErrors,
  } = useCustomForm();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();

  const motivoOptions = [
    { label: "CREACION", value: "CREACION" },
    { label: "PERDIDA", value: "PERDIDA" },
  ];

  const onHideForm = () => {
    props.setShowForm(false);
  };

  const validateForm = () => {
    let valid = true;

    if (!formData?.motivo || formData?.motivo === "") {
      valid = false;
      handleSetFormErrors("motivo", "Campo requerido");
    }

    if (!formData?.cantidad || formData?.cantidad === "") {
      valid = false;
      handleSetFormErrors("cantidad", "Campo requerido");
    }

    return valid;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();

        const { data } = await api.post(
          "/movimientos-colmenas/add-tmp",
          formData
        );
        // Si todo esta OK, actualizamos tabla
        showSuccessMsg(data.message);

        onHideForm();
        props.getMovimientos();
        props.getColmenas();
        props.updateCantidadActual(
          formData.cantidad,
          formData.motivo == "CREACION" ? "SUMAR" : "RESTAR"
        );
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  /** Si le paso datos para editar */
  useEffect(() => {
    setFormData({ id_colmena_tmp: props.idColmena });
  }, [props.showForm]);

  return (
    <Dialog
      header={"Nuevo Movimiento"}
      visible={props.showForm}
      style={{ width: "40vw" }}
      footer={null}
      onHide={onHideForm}
      position={"center"}
    >
      <div className="grid mt-3">
        <FloatInput
          className="col-12 mt-3"
          label="Motivo de movimiento"
          errorName={"motivo"}
          formErrors={formErrors}
        >
          <Dropdown
            className={`${formErrors?.motivo && "p-invalid"}  w-full`}
            name={"motivo"}
            value={formData?.motivo ?? ""}
            options={motivoOptions}
            onChange={handleFormChange}
          />
        </FloatInput>

        <FloatInput
          className="col-12 mt-3"
          label="Cantidad"
          errorName={"cantidad"}
          formErrors={formErrors}
        >
          <InputNumber
            className={`${formErrors?.cantidad && "p-invalid"} w-full`}
            name="cantidad"
            value={formData?.cantidad ?? ""}
            min={1}
            useGrouping={false}
            onChange={handleFormChange}
          />
        </FloatInput>

        <FloatInput
          className="col-12 mt-3"
          label="Observación"
          errorName={"observacion"}
          formErrors={formErrors}
        >
          <InputTextarea
            className={`${formErrors?.observacion && "p-invalid"}`}
            name="observacion"
            value={formData?.observacion ?? ""}
            onChange={handleFormChange}
            rows={4}
          />
        </FloatInput>

        <div className="col-12 flex justify-content-end">
          <Button type="submit" label="Guardar" onClick={onSubmitForm} />
        </div>
      </div>
    </Dialog>
  );
}
