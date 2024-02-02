import FloatInput from "@/base/components/Form/FloatInput";
import useCustomForm from "@/base/hooks/useCustomForm";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import Media from "@/base/components/Media/Media";
import { formatMultipartFormData } from "@/base/helpers/utils";
import MeliponicultorResponsable from "../MeliponicultorReponsableSection/MeliponicultorResponsable";
import UserEmail from "../UserEmail";
import { InputNumber } from "@/base/components/Form/InputNumber";

export default function InsDatosProductor({
  setActiveTab,
  formData,
  handleFormChange,
  formErrors,
  setFormData,
  handleSetFormErrors,
  datosActualesProductor,
}) {
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader, showConfirmDialog } =
    useGeneralContext();

  const tipoPersonaOptions = [
    { label: "Persona Fisica", value: false },
    { label: "Persona Juridica", value: true },
  ];

  const tipoDocOptions = [
    { label: "DNI", value: "DNI" },
    { label: "LIBRETA", value: "LIBRETA" },
  ];

  const handleChangeTipoPersona = (e) => {
    const value = e.target.value;
    //Si tengo datos de productor cargados
    if (datosActualesProductor?.persona_juridica != undefined) {
      if (value == datosActualesProductor.persona_juridica) {
        setFormData((prevVal) => ({
          ...prevVal,
          foto_doc_adelante: datosActualesProductor.foto_doc_adelante,
          foto_doc_atras: datosActualesProductor.foto_doc_atras,
          foto_constancia: datosActualesProductor.foto_constancia,
        }));
      } else {
        setFormData((prevVal) => ({
          ...prevVal,
          foto_doc_adelante: null,
          foto_doc_atras: null,
          foto_constancia: null,
        }));
      }
    }

    setFormData((prevVal) => ({
      ...prevVal,
      persona_juridica: value,
    }));
  };

  const handleCuitChange = (e) => {
    const inputValue = e.target.value;

    // Eliminar todos los caracteres no numéricos y limitar a 11 dígitos
    const numericCuit = inputValue.replace(/\D/g, "").slice(0, 11);

    // Aplicar la máscara
    let maskedCuit = "";
    for (let i = 0; i < numericCuit.length; i++) {
      if (i === 2 || i === 10) {
        maskedCuit += "-";
      }
      maskedCuit += numericCuit[i];
    }
    e.target.value = maskedCuit;
    handleFormChange(e);
  };

  const validateForm = () => {
    let valid = true;

    if (!formData?.fecha_inicio_actividad) {
      valid = false;
      handleSetFormErrors("fecha_inicio_actividad", "Campo requerido");
    }

    if (typeof formData?.persona_juridica === "undefined") {
      valid = false;
      handleSetFormErrors("persona_juridica", "Campo requerido");
    }

    if (!formData?.persona_juridica) {
      if (!formData?.apellido) {
        valid = false;
        handleSetFormErrors("apellido", "Campo requerido");
      }

      if (!formData?.nombres) {
        valid = false;
        handleSetFormErrors("nombres", "Campo requerido");
      }

      if (!formData?.cuit) {
        valid = false;
        handleSetFormErrors("cuit", "Campo requerido");
      }

      if (!formData?.tipo_doc) {
        valid = false;
        handleSetFormErrors("tipo_doc", "Campo requerido");
      }

      if (!formData?.documento) {
        valid = false;
        handleSetFormErrors("documento", "Campo requerido");
      }

      if (!formData?.telefono) {
        valid = false;
        handleSetFormErrors("telefono", "Campo requerido");
      }
    } else {
      if (!formData?.razon_social) {
        valid = false;
        handleSetFormErrors("razon_social", "Campo requerido");
      }

      if (!formData?.cuit) {
        valid = false;
        handleSetFormErrors("cuit", "Campo requerido");
      }

      if (!formData?.telefono_empresa) {
        valid = false;
        handleSetFormErrors("telefono_empresa", "Campo requerido");
      }

      if (!formData?.apellido) {
        valid = false;
        handleSetFormErrors("apellido", "Campo requerido");
      }

      if (!formData?.nombres) {
        valid = false;
        handleSetFormErrors("nombres", "Campo requerido");
      }

      if (!formData?.cuit_rep_legal) {
        valid = false;
        handleSetFormErrors("cuit_rep_legal", "Campo requerido");
      }

      if (!formData?.tipo_doc) {
        valid = false;
        handleSetFormErrors("tipo_doc", "Campo requerido");
      }

      if (!formData?.documento) {
        valid = false;
        handleSetFormErrors("documento", "Campo requerido");
      }

      if (!formData?.email) {
        valid = false;
        handleSetFormErrors("email", "Campo requerido");
      }

      if (!formData?.telefono) {
        valid = false;
        handleSetFormErrors("telefono", "Campo requerido");
      }

      if (!formData?.productor_responsable) {
        valid = false;
        handleSetFormErrors("productor_responsable", "Campo requerido");
      }
    }

    return valid;
  };

  const onSubmitFormProd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();
        // Armamos formData a enviar
        let newFormData = {};
        if (formData.persona_juridica) {
          // Si es persona juridica, agregamos solo el id de productor_responsable para no enviar datos inncesarios
          const { productor_responsable, ...restData } = formData;
          newFormData = {
            ...restData,
            id_productor_responsable: productor_responsable.id,
          };
        } else {
          newFormData = { ...formData };
        }

        const array_keys = [
          "foto_doc_adelante",
          "foto_doc_atras",
          "foto_constancia",
        ];
        const _data = formatMultipartFormData(array_keys, newFormData);

        const { data } = await api.post(
          "/productores/update-datosproductor",
          _data,
          MEDIA_HEADERS
        );

        // Si todo esta OK
        showSuccessMsg(data.message);
        // Pasamos a la otra tab
        setActiveTab(1);
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  return (
    <form onSubmit={onSubmitFormProd} autoComplete="off">
      <div className="grid">
        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Tipo de Persona"
          errorName="persona_juridica"
          formErrors={formErrors}
        >
          <Dropdown
            className={`${formErrors?.persona_juridica && "p-invalid"}  w-full`}
            name={"persona_juridica"}
            value={formData?.persona_juridica}
            options={tipoPersonaOptions}
            onChange={handleChangeTipoPersona}
          />
        </FloatInput>
        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Inicio de Actividad"
          errorName="fecha_inicio_actividad"
          formErrors={formErrors}
        >
          <Calendar
            key={formData?.fecha_inicio_actividad}
            className={`${formErrors?.fecha_inicio_actividad && "p-invalid"}`}
            name="fecha_inicio_actividad"
            value={new Date(formData?.fecha_inicio_actividad)}
            onChange={handleFormChange}
            readOnlyInput
            showIcon
          />
        </FloatInput>
      </div>

      {formData?.persona_juridica == true && (
        <>
          <div className="grid mt-2">
            <h5 className="col-12">Empresa</h5>
            <FloatInput
              className="col-12 md:col-4 mt-3"
              label="Razon Social"
              errorName={"razon_social"}
              formErrors={formErrors}
            >
              <InputText
                className={`${formErrors?.razon_social && "p-invalid"}`}
                name="razon_social"
                value={formData?.razon_social ?? ""}
                onChange={handleFormChange}
              />
            </FloatInput>
            <FloatInput
              className="col-12 md:col-4 mt-3"
              label="CUIT/CUIL"
              errorName={"cuit"}
              formErrors={formErrors}
            >
              <InputText
                className={`${formErrors?.cuit && "p-invalid"}`}
                name="cuit"
                value={formData?.cuit ?? ""}
                onChange={handleCuitChange}
              />
            </FloatInput>

            <UserEmail />

            <FloatInput
              className="col-12 md:col-4 mt-3"
              label="Telefono"
              errorName={"telefono_empresa"}
              formErrors={formErrors}
            >
              <InputText
                className={`${formErrors?.telefono_empresa && "p-invalid"}`}
                name="telefono_empresa"
                value={formData?.telefono_empresa ?? ""}
                onChange={handleFormChange}
              />
            </FloatInput>
          </div>
        </>
      )}

      <div className="grid mt-2">
        {formData?.persona_juridica == true ? (
          <h5 className="col-12  mt-3">Representante Legal</h5>
        ) : (
          <h5 className="col-12  mt-3">Productor</h5>
        )}
        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Apellidos"
          errorName={"apellido"}
          formErrors={formErrors}
        >
          <InputText
            className={`${formErrors?.apellido && "p-invalid"}`}
            name="apellido"
            value={formData?.apellido ?? ""}
            onChange={handleFormChange}
          />
        </FloatInput>

        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Nombres"
          errorName={"nombres"}
          formErrors={formErrors}
        >
          <InputText
            className={`${formErrors?.nombres && "p-invalid"}`}
            name="nombres"
            value={formData?.nombres ?? ""}
            onChange={handleFormChange}
          />
        </FloatInput>

        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="CUIT/CUIL"
          errorName={
            formData?.persona_juridica == true ? "cuit_rep_legal" : "cuit"
          }
          formErrors={formErrors}
        >
          {formData?.persona_juridica == true ? (
            <InputText
              className={`${formErrors?.cuit_rep_legal && "p-invalid"}`}
              name="cuit_rep_legal"
              value={formData?.cuit_rep_legal ?? ""}
              onChange={handleCuitChange}
            />
          ) : (
            <InputText
              className={`${formErrors?.cuit && "p-invalid"}`}
              name="cuit"
              value={formData?.cuit ?? ""}
              onChange={handleCuitChange}
            />
          )}
        </FloatInput>

        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Tipo DOC"
          errorName={"tipo_doc"}
          formErrors={formErrors}
        >
          <Dropdown
            className={`${formErrors?.tipo_doc && "p-invalid"}  w-full`}
            name={"tipo_doc"}
            value={formData?.tipo_doc ?? ""}
            options={tipoDocOptions}
            onChange={handleFormChange}
          />
        </FloatInput>

        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Documento"
          errorName={"documento"}
          formErrors={formErrors}
        >
          <InputNumber
            className={`${formErrors?.documento && "p-invalid"} w-full`}
            name="documento"
            value={formData?.documento ?? ""}
            onChange={handleFormChange}
            useGrouping={false}
          />
        </FloatInput>

        {!formData?.persona_juridica ? (
          <UserEmail />
        ) : (
          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Correo Electronico"
            errorName={"email"}
            formErrors={formErrors}
          >
            <InputText
              className={`${formErrors?.email && "p-invalid"}`}
              name="email"
              value={formData?.email ?? ""}
              onChange={handleFormChange}
            />
          </FloatInput>
        )}

        <FloatInput
          className="col-12 md:col-4 mt-3"
          label="Telefono"
          errorName={"telefono"}
          formErrors={formErrors}
        >
          <InputText
            className={`${formErrors?.telefono && "p-invalid"}`}
            name="telefono"
            value={formData?.telefono ?? ""}
            onChange={handleFormChange}
          />
        </FloatInput>
        <div className="col-12 md:col-4">
          <Media
            acceptImages
            label="Foto Documento Adelante"
            name="foto_doc_adelante"
            onChange={handleFormChange}
            value={formData?.foto_doc_adelante}
          />
        </div>
        <div className="col-12 md:col-4">
          <Media
            acceptImages
            label="Foto Documento Atras"
            name="foto_doc_atras"
            onChange={handleFormChange}
            value={formData?.foto_doc_atras}
          />
        </div>
        {formData?.persona_juridica == true && (
          <>
            <div className="col-12 md:col-4">
              <Media
                acceptImages
                label="Constancia"
                name="foto_constancia"
                onChange={handleFormChange}
                value={formData?.foto_constancia}
              />
            </div>
          </>
        )}
      </div>

      {formData?.persona_juridica == true && (
        <MeliponicultorResponsable
          formErrors={formErrors}
          formData={formData}
          setFormData={setFormData}
          handleFormChange={handleFormChange}
          handleSetFormErrors={handleSetFormErrors}
        />
      )}
      <div className="grid">
        <div className="col-12 mt-3 flex justify-content-end">
          <Button
            label="Guardar y Continuar"
            className="p-button-sm p-button-success mr-2"
          />
        </div>
      </div>
    </form>
  );
}
