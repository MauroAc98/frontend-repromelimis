import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useCustomForm from "@/base/hooks/useCustomForm";
import useGetEspecies from "@/project/hooks/endpointsHooks/useGetEspecies";
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
  const [especies, setEspecies] = useState({
    requestStatus: "LOADING",
    data: [],
  });
  const {
    formData,
    setFormData,
    handleFormChange,
    formErrors,
    handleSetFormErrors,
    resetForm,
  } = useCustomForm();

  /** GET ESPECIES */
  const { getEspecies } = useGetEspecies(onSuccessGetEspecies, null);

  function onSuccessGetEspecies(data) {
    // Agregamos item OTRA
    const _data = [...data, { id: 0, nombre: "OTRA" }];
    setEspecies({
      requestStatus: "SUCCESS",
      data: _data,
    });
  }
  /** END GET ESPECIES */

  const especieItemTemplate = (option) => {
    // Item OTRA
    if (option.id == 0) {
      return option.nombre;
    }
    // Demas items
    return `${option.nombre} / ${option.nombre_comun}`;
  };

  const especieValueTemplate = (option, props) => {
    if (option) {
      // Item OTRA
      if (option.id == 0) {
        return option.nombre;
      }
      // Demas items
      return (
        <div>
          {option.nombre} / {option.nombre_comun}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const handleClickClean = () => {
    props.setSubmitAction("add");
    props.setEditData(null);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    // Si no envio OTRA, valido que haya elegido alguna especie
    if (formData?.id_especie != 0) {
      if (!formData?.id_especie || formData?.id_especie === "") {
        valid = false;
        handleSetFormErrors("id_especie", "Campo requerido");
      }
    }

    // Si envio OTRA, valido descripciones
    if (formData?.id_especie == 0) {
      if (
        !formData?.descripcion_nombre_comun ||
        formData?.descripcion_nombre_comun === ""
      ) {
        valid = false;
        handleSetFormErrors("descripcion_nombre_comun", "Campo requerido");
      }
      if (
        !formData?.descripcion_especie ||
        formData?.descripcion_especie === ""
      ) {
        valid = false;
        handleSetFormErrors("descripcion_especie", "Campo requerido");
      }
    }

    if (!formData?.cant_colmenas || formData?.cant_colmenas === "") {
      valid = false;
      handleSetFormErrors("cant_colmenas", "Campo requerido");
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
            ? "/especies-abejas/add-tmp"
            : `/especies-abejas/edit-tmp/${formData.id}`;

        // Copia de formData para manipularlo
        let formDataSend = {
          ...formData,
          id_especie: formData?.id_especie != 0 ? formData?.id_especie : null, //Si tengo el id 0, envio null
          descripcion_especie: formData?.id_especie != 0 ? null : formData?.descripcion_especie, 
          descripcion_nombre_comun: formData?.id_especie != 0 ? null : formData?.descripcion_nombre_comun, 
        };

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

  useEffect(() => {
    getEspecies();
  }, []);

  /** Si le paso datos para editar */
  useEffect(() => {
    if (props.editData) {
      let _formData = { ...props.editData };
      // Si no tengo id_especie, coloco el id 0
      if (!_formData.id_especie) {
        _formData.id_especie = 0;
      }
      setFormData(_formData);
    }else{
      handleClickClean()
    }
  }, [props.editData]);

  if (especies.requestStatus == "LOADING") {
    return <SectionLoader />;
  }

  return (
    <form className="grid mt-3" onSubmit={onSubmitForm}>
      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Especie / Nombre común"
        errorName={"id_especie"}
        formErrors={formErrors}
      >
        <Dropdown
          placeholder="Especie / Nombre común"
          className={`${formErrors?.id_especie && "p-invalid"}  w-full`}
          name={"id_especie"}
          value={formData?.id_especie ?? ""}
          options={especies.data}
          optionValue="id"
          optionLabel="nombre"
          onChange={handleFormChange}
          itemTemplate={especieItemTemplate}
          valueTemplate={especieValueTemplate}
        />
      </FloatInput>

      {formData?.id_especie == 0 && (
        <>
          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Descripción especie"
            errorName={"descripcion_especie"}
            formErrors={formErrors}
          >
            <InputText
              className={`${formErrors?.descripcion_especie && "p-invalid"}`}
              name="descripcion_especie"
              value={formData?.descripcion_especie ?? ""}
              onChange={handleFormChange}
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Descripción nombre común"
            errorName={"descripcion_nombre_comun"}
            formErrors={formErrors}
          >
            <InputText
              className={`${
                formErrors?.descripcion_nombre_comun && "p-invalid"
              }`}
              name="descripcion_nombre_comun"
              value={formData?.descripcion_nombre_comun ?? ""}
              onChange={handleFormChange}
            />
          </FloatInput>
        </>
      )}

      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Cant. colmenas"
        errorName={"cant_colmenas"}
        formErrors={formErrors}
      >
        <InputNumber
          className={`${formErrors?.cant_colmenas && "p-invalid"} w-full`}
          name="cant_colmenas"
          value={formData?.cant_colmenas ?? ""}
          onChange={handleFormChange}
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
