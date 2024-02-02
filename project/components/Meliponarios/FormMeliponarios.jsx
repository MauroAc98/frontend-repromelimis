import FloatInput from "@/base/components/Form/FloatInput";
import useCustomForm from "@/base/hooks/useCustomForm";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import api, { getResponseError } from "@/base/helpers/api";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import FormDireccion from "@/base/components/Direccion/FormDireccion";
import { useEffect, useState } from "react";
import { InputNumber } from "@/base/components/Form/InputNumber";

export default function FormMeliponarios(props) {
  const {
    formData,
    setFormData,
    handleFormChange,
    formErrors,
    handleSetFormErrors,
  } = useCustomForm();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { getTramiteActual, datosTramite } = useTramiteContext();

  const tipoProduccionOptions = [
    { label: "Convencional", value: "CONVENCIONAL" },
    { label: "Agro Ecológica", value: "AGRO_ECOLOGICA" },
  ];

  const estadoOptions = [
    { label: "ACTIVO", value: "ACTIVO" },
    { label: "INACTIVO", value: "INACTIVO" },
  ];

  const validateForm = () => {
    let valid = true;

    if (!formData?.tipo_produccion || formData?.tipo_produccion === "") {
      valid = false;
      handleSetFormErrors("tipo_produccion", "Campo requerido");
    }

    if (
      !formData?.direccion?.id_departamento ||
      formData?.direccion?.id_departamento === ""
    ) {
      valid = false;
      handleSetFormErrors("direccion.id_departamento", "Campo requerido");
    }

    if (
      !formData?.direccion?.id_localidad ||
      formData?.direccion?.id_localidad === ""
    ) {
      valid = false;
      handleSetFormErrors("direccion.id_localidad", "Campo requerido");
    }

    if (
      !formData?.direccion?.longitud ||
      formData?.direccion?.longitud === ""
    ) {
      valid = false;
      handleSetFormErrors("direccion.longitud", "Campo requerido");
    }

    if (!formData?.direccion?.latitud || formData?.direccion?.latitud === "") {
      valid = false;
      handleSetFormErrors("direccion.latitud", "Campo requerido");
    }
    return valid;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();

        const url =
          props.submitAction == "add"
            ? "/meliponarios/add-tmp"
            : `/meliponarios/edit-tmp/${formData.id}`;

        // Copia de formData para manipularlo
        let formDataSend = { ...formData };

        // Concatenamos el id_tramite, si vamos a crear
        if (props.submitAction == "add") {
          formDataSend = { ...formDataSend, id_tramite: datosTramite.id };
        }

        const { data } = await api.post(url, formDataSend);
        // Si todo esta OK, actualizamos tabla y ocultamos dialog
        getTramiteActual();
        showSuccessMsg(data.message);
        props.onHideForm();
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  const handleTipoProduccion = ({ target }) => {
    setFormData({ ...formData, tipo_produccion: target.value });
    if (target.value === "CONVENCIONAL") {
      setFormData((prevVal) => ({
        ...prevVal,
        nro_sucp: null,
      }));
    }
  };
  /** Si vamos a editar un meliponario, seteamos */
  useEffect(() => {
    setFormData(props.meliData);
  }, [props.meliData]);

  return (
    <>
      <form className="grid mt-2" onSubmit={onSubmitForm} autoComplete="off">
        <FloatInput
          className="col-12 md:col-6 mt-3"
          label="Tipo de producción"
          errorName={"tipo_produccion"}
          formErrors={formErrors}
        >
          <Dropdown
            className={`${formErrors?.tipo_produccion && "p-invalid"}  w-full`}
            name={"tipo_produccion"}
            value={formData?.tipo_produccion ?? ""}
            options={tipoProduccionOptions}
            onChange={handleTipoProduccion}
          />
        </FloatInput>

        {props.submitAction == "edit" && (
          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Estado"
            errorName={"estado"}
            formErrors={formErrors}
          >
            <Dropdown
              className={`${formErrors?.estado && "p-invalid"}  w-full`}
              name={"estado"}
              value={formData?.estado ?? ""}
              options={estadoOptions}
              onChange={handleFormChange}
            />
          </FloatInput>
        )}

        {formData?.tipo_produccion === "AGRO_ECOLOGICA" && (
          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="N° de SUCP"
            errorName={"nro_sucp"}
            formErrors={formErrors}
          >
            <InputNumber
              className={`${formErrors?.nro_sucp && "p-invalid"} w-full`}
              name="nro_sucp"
              value={formData?.nro_sucp ?? ""}
              onChange={handleFormChange}
              useGrouping={false}
            />
          </FloatInput>
        )}

        <div className="col-12 grid">
          <FormDireccion
            objName="direccion"
            inputValue={formData?.direccion}
            errorValue={formErrors?.direccion}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
          />
        </div>

        <div className="col-12 mt-3 flex justify-content-end">
          <Button
            label="Guardar"
            className="p-button-sm p-button-success mr-2"
          />
          <Button
            type="button"
            label="Cancelar"
            onClick={props.onHideForm}
            className="p-button-sm p-button-danger"
          />
        </div>
      </form>
    </>
  );
}
