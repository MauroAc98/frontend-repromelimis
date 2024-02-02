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
import { TabView, TabPanel } from "primereact/tabview";
import FormDireccion from "@/base/components/Direccion/FormDireccion";
import Media from "@/base/components/Media/Media";
import { checkFormData, formatMultipartFormData } from "@/base/helpers/utils";
import { useRouter } from "next/router";
import MeliponicultorResponsable from "../MeliponicultorReponsableSection/MeliponicultorResponsable";
import UserEmail from "../UserEmail";

export default function Direccion({
  formData,
  handleFormChange,
  formErrors,
  setFormData,
  handleSetFormErrors,
  datosTramite,
}) {
  const router = useRouter();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();

  const validateForm = () => {
    let valid = true;
    if (!formData?.persona_juridica) {
      if (typeof formData?.direccion_real?.id_departamento == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_real.id_departamento",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_real?.id_localidad == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_real.id_localidad", "Campo requerido");
      }
      if (typeof formData?.direccion_real?.latitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_real.latitud", "Campo requerido");
      }
      if (typeof formData?.direccion_real?.longitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_real.longitud", "Campo requerido");
      }
      if (typeof formData?.direccion_legal?.id_departamento == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_legal.id_departamento",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_legal?.id_localidad == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_legal.id_localidad", "Campo requerido");
      }
      if (typeof formData?.direccion_legal?.latitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_legal.latitud", "Campo requerido");
      }
      if (typeof formData?.direccion_legal?.longitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_legal.longitud", "Campo requerido");
      }
    } else {
      if (typeof formData?.direccion_empresa?.id_departamento == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_empresa.id_departamento",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_empresa?.id_localidad == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_empresa.id_localidad",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_empresa?.latitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_empresa.latitud", "Campo requerido");
      }
      if (typeof formData?.direccion_empresa?.longitud == "undefined") {
        valid = false;
        handleSetFormErrors("direccion_empresa.longitud", "Campo requerido");
      }
      if (
        typeof formData?.direccion_representante?.id_departamento == "undefined"
      ) {
        valid = false;
        handleSetFormErrors(
          "direccion_representante.id_departamento",
          "Campo requerido"
        );
      }
      if (
        typeof formData?.direccion_representante?.id_localidad == "undefined"
      ) {
        valid = false;
        handleSetFormErrors(
          "direccion_representante.id_localidad",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_representante?.latitud == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_representante.latitud",
          "Campo requerido"
        );
      }
      if (typeof formData?.direccion_representante?.longitud == "undefined") {
        valid = false;
        handleSetFormErrors(
          "direccion_representante.longitud",
          "Campo requerido"
        );
      }
    }

    return valid;
  };

  const onSubmitFormProd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();
        const url =
          datosTramite.tipo_tramite == "INSCRIPCION"
            ? "/productores/update-datosdireccion"
            : "/productores/update-datosdireccion-act";

        const { data } = await api.post(url, formData);

        // Si todo esta OK
        showSuccessMsg(data.message);
        // Redirigir a la siguiente pagina
        const nextPage =
          datosTramite.tipo_tramite == "INSCRIPCION"
            ? "/tramites/acred-capa"
            : "/tramites/meliponarios";
        router.push(nextPage);
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  if (formData?.persona_juridica == undefined) {
    return (
      <div className="grid">
        <div className="col-12">
          Para visualizar los datos de direccion, primero debe completar los
          datos de productor.
        </div>
      </div>
    );
  }

  return (
    <form
      className=""
      onSubmit={(e) => onSubmitFormProd(e, "DIRECCION")}
      autoComplete="off"
    >
      {formData.persona_juridica ? (
        <div className="grid">
          <h6 className="col-12">Empresa - Domicilio</h6>
          <FormDireccion
            inputValue={formData?.direccion_empresa}
            errorValue={formErrors?.direccion_empresa}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_empresa"}
          />
          <h6 className="col-12">Representante Legal - Domicilio</h6>
          <FormDireccion
            inputValue={formData?.direccion_representante}
            errorValue={formErrors?.direccion_representante}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_representante"}
          />
        </div>
      ) : (
        <div className="grid">
          <h6 className="col-12">Domicilio Real</h6>
          <FormDireccion
            inputValue={formData?.direccion_real}
            errorValue={formErrors?.direccion_real}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_real"}
          />
          <h6 className="col-12">Domicilio Legal</h6>
          <FormDireccion
            inputValue={formData?.direccion_legal}
            errorValue={formErrors?.direccion_legal}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_legal"}
          />
        </div>
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
