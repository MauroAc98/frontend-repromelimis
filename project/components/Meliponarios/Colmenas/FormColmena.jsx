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
import StaticText from "@/base/components/Form/StaticText";

export default function FormColmena(props) {
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
  } = useCustomForm();


  const tipoColmenaOptions = [
    { label: "Tecnificada", value: "TECNIFICADA" },
    { label: "Rústica", value: "RUSTICA" },
    { label: "Natural (sección tronco u otro)", value: "NATURAL" },
    { label: "Trampa poblada", value: "TRAMPA_POBLADA" },
  ];

  const options_procedencia = [
    { label: "Multiplicacion de colmenas", value: "MULTIPLICACION" },
    { label: "Captura de enjambres", value: "CAPTURA_ENJAMBRES" },
    { label: "Colmenas preexistentes", value: "COLMENAS_PREEXISTENTES" },
    { label: "Traslado de meliponario a meliponario", value: "TRASLADO_MELI_A_MELI" },
    { label: "Otros", value: "OTROS" },
  ];

  const estadoOptions = [
    { label: "ACTIVO", value: "ACTIVO" },
    { label: "INACTIVO", value: "INACTIVO" },
  ];

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

    if (!formData?.tipo_colmena || formData?.tipo_colmena === "") {
      valid = false;
      handleSetFormErrors("tipo_colmena", "Campo requerido");
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
            ? "/colmenas/add-tmp"
            : `/colmenas/edit-tmp/${formData.id}`;

        // Copia de formData para manipularlo
        let formDataSend = {
          ...formData,
          id_especie: formData?.id_especie != 0 ? formData?.id_especie : null, //Si tengo el id 0, envio null
          descripcion_especie:
            formData?.id_especie != 0 ? null : formData?.descripcion_especie,
          descripcion_nombre_comun:
            formData?.id_especie != 0
              ? null
              : formData?.descripcion_nombre_comun,
        };

        const { data } = await api.post(url, formDataSend);
        // Si todo esta OK, actualizamos tabla
        showSuccessMsg(data.message);
        props.getColmenas();
        if (props.submitAction == "add") {
          props.onHideDialog();
        }
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  const evalEspecie = () => {
    if (props.editData?.id_especie) {
      return `${props.editData?.especie.nombre} - ${props.editData?.especie.nombre_comun}`;
    }
    return `${props.editData?.descripcion_especie} - ${props.editData?.descripcion_nombre_comun}`;
  };

  useEffect(() => {
    getEspecies();
  }, []);

  /** Si le paso datos para editar */
  useEffect(() => {
    if (props.submitAction == "edit") {
      let _formData = { ...props.editData };
      // Si no tengo id_especie, coloco el id 0
      if (!_formData.id_especie) {
        _formData.id_especie = 0;
      }
      setFormData(_formData);
    } else {
      setFormData({ id_meliponario_tmp: props.idMeliponarioTmp });
    }
  }, [props.editData]);

  if (especies.requestStatus == "LOADING") {
    return <SectionLoader />;
  }

  return (
    <div className="grid mt-3">
      {props.editData?.id_registro_actual ? (
        <div className="col-12 md:col-6 mt-3">
          <StaticText
            label={"Especie / Nombre común"}
            value={evalEspecie()}
          />
        </div>
      ) : (
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
            disabled={props.editData?.id_registro_actual ? true : false}
          />
        </FloatInput>
      )}

      {formData?.id_especie == 0 && !props.editData?.id_registro_actual && (
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
              className={`${formErrors?.descripcion_nombre_comun && "p-invalid"
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
        label="Tipo de colmena"
        errorName={"tipo_colmena"}
        formErrors={formErrors}
      >
        <Dropdown
          className={`${formErrors?.tipo_colmena && "p-invalid"}  w-full`}
          name={"tipo_colmena"}
          value={formData?.tipo_colmena ?? ""}
          options={tipoColmenaOptions}
          onChange={handleFormChange}
        />
      </FloatInput>

      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Procedencia"
        errorName={"procedencia"}
        formErrors={formErrors}
      >
        <Dropdown
          className={`${formErrors?.procedencia && "p-invalid"}  w-full`}
          name={"procedencia"}
          value={formData?.procedencia ?? ""}
          options={options_procedencia}
          onChange={handleFormChange}
        />
      </FloatInput>

      {formData?.procedencia == 'OTROS' && <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Descripción procedencia"
        errorName={"descripcion_procedencia"}
        formErrors={formErrors}
      >
        <InputTextarea
          className={`${formErrors?.descripcion_procedencia && "p-invalid"}`}
          name="descripcion_procedencia"
          value={formData?.descripcion_procedencia ?? ""}
          onChange={handleFormChange}
          rows={4}
        />
      </FloatInput>}

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

      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Descripción"
        errorName={"descripcion"}
        formErrors={formErrors}
      >
        <InputTextarea
          className={`${formErrors?.descripcion && "p-invalid"}`}
          name="descripcion"
          value={formData?.descripcion ?? ""}
          onChange={handleFormChange}
          rows={4}
        />
      </FloatInput>

      <div className="col-12 mt-3 flex justify-content-end gap-2">
        <Button
          label="Guardar"
          className="p-button-sm p-button-primary"
          onClick={onSubmitForm}
        />
      </div>
    </div>
  );
}
