import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useCustomForm from "@/base/hooks/useCustomForm";
import { useEffect, useState } from "react";
import SectionLoader from "@/base/components/Loader/SectionLoader";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import api, { getResponseError } from "@/base/helpers/api";
import { InputNumber } from "@/base/components/Form/InputNumber";

export const Form = (props) => {
  const { datosTramite, getTramiteActual } = useTramiteContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();

  const {
    formData,
    setFormData,
    handleFormChange,
    formErrors,
    handleSetFormErrors,
    resetForm,
  } = useCustomForm();

  const handleClickClean = () => {
    props.setSubmitAction("add");
    props.setEditData(null);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;

    return valid;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();
        const url =
          props.submitAction == "add"
            ? "/actividades/add-tmp"
            : `/actividades/edit-tmp/${formData.id}`;

        let formDataSend = formData;

        // Concatenamos el id_tramite, si vamos a crear
        if (props.submitAction == "add") {
          formDataSend = { ...formDataSend, id_tramite: datosTramite.id };
        }
        const { data } = await api.post(url, formDataSend);
        // Si todo esta OK, actualizamos tabla
        showSuccessMsg(data.message);
        getTramiteActual();
        handleClickClean();
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  /** Si le paso datos para editar */
  useEffect(() => {
    if (props.editData) {
      let _formData = { ...props.editData };
      setFormData(_formData);
    } else {
      handleClickClean();
    }
  }, [props.editData]);

  const tipoActividadOptions = [
    { label: "Fabrica", value: "FABRICA" },
    { label: "Vende", value: "VENDE" },
  ];

  const actividadOptions = [
    { label: "Cajones", value: "CAJONES" },
    { label: "Otros", value: "OTROS" },
  ];

  useEffect(() => {
    if (formData?.actividad != "OTROS") {
      setFormData((prevVal) => ({ ...prevVal, descripcion: "" }));
    }
  }, [formData?.actividad]);

  return (
    <form className="grid mt-3" onSubmit={onSubmitForm}>
      <FloatInput
        className="col-12 md:col-4 mt-3"
        label="Tipo de Actividad"
        errorName="tipo_actividad"
        formErrors={formErrors}
      >
        <Dropdown
          className={`${formErrors?.tipo_actividad && "p-invalid"}  w-full`}
          name={"tipo_actividad"}
          value={formData?.tipo_actividad}
          options={tipoActividadOptions}
          onChange={handleFormChange}
        />
      </FloatInput>
      <FloatInput
        className="col-12 md:col-4 mt-3"
        label="Actividad"
        errorName="actividad"
        formErrors={formErrors}
      >
        <Dropdown
          className={`${formErrors?.actividad && "p-invalid"}  w-full`}
          name={"actividad"}
          value={formData?.actividad}
          options={actividadOptions}
          onChange={handleFormChange}
          disabled={formData?.tipo_actividad ? false : true}
        />
      </FloatInput>
      <FloatInput
        className="col-12 md:col-4 mt-3"
        label="Descripcion Actividad"
        errorName={"descripcion"}
        formErrors={formErrors}
      >
        <InputText
          className={`${formErrors?.descripcion && "p-invalid"}`}
          name="descripcion"
          value={formData?.descripcion ?? ""}
          onChange={handleFormChange}
          disabled={formData?.actividad === "OTROS" ? false : true}
        />
      </FloatInput>

      <div className="col-12 mt-3 flex justify-content-center gap-2">
        <Button label="Guardar" className="p-button-sm p-button-primary" />
        <Button
          type="button"
          label="Limpiar"
          className="p-button-sm p-button-secondary"
          onClick={handleClickClean}
        />
      </div>
    </form>
  );
};
