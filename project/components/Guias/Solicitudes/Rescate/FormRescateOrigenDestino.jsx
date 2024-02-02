import FormDireccion from "@/base/components/Direccion/FormDireccion";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import useCustomForm from "@/base/hooks/useCustomForm";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import { Button } from "primereact/button";
import { useEffect } from "react";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useRouter } from "next/router";

export default function FormRescateOrigenDestino(props) {
  const router = useRouter();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const {
    formData,
    handleFormChange,
    formErrors,
    setFormData,
    handleSetFormErrors,
  } = useCustomForm();

  const { datosSolicitud } = useSolicitudGuiaContext();

  const validateForm = () => {
    let valid = true;
    if (typeof formData?.direccion_origen?.id_departamento == "undefined") {
      valid = false;
      handleSetFormErrors(
        "direccion_origen.id_departamento",
        "Campo requerido"
      );
    }
    if (typeof formData?.direccion_origen?.id_localidad == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_origen.id_localidad", "Campo requerido");
    }
    if (typeof formData?.direccion_origen?.latitud == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_origen.latitud", "Campo requerido");
    }
    if (typeof formData?.direccion_origen?.longitud == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_origen.longitud", "Campo requerido");
    }

    if (typeof formData?.direccion_destino?.id_departamento == "undefined") {
      valid = false;
      handleSetFormErrors(
        "direccion_destino.id_departamento",
        "Campo requerido"
      );
    }
    if (typeof formData?.direccion_destino?.id_localidad == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_destino.id_localidad", "Campo requerido");
    }
    if (typeof formData?.direccion_destino?.latitud == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_destino.latitud", "Campo requerido");
    }
    if (typeof formData?.direccion_destino?.longitud == "undefined") {
      valid = false;
      handleSetFormErrors("direccion_destino.longitud", "Campo requerido");
    }

    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();
        const { data } = await api.post(
          "/solicitudes-guias/update-solicitud",
          formData
        );

        showSuccessMsg(data.message);
        router.push("/guias-traslado/solicitudes/movimientos-colmenas");
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  useEffect(() => {
    setFormData(datosSolicitud);
  }, [datosSolicitud]);

  return (
    <>
      <form className="" onSubmit={(e) => onSubmit(e)} autoComplete="off">
        <div className="grid">
          <h6 className="col-12">Datos de Origen</h6>
          <FormDireccion
            inputValue={formData?.direccion_origen}
            errorValue={formErrors?.direccion_origen}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_origen"}
          />
          <h6 className="col-12">Datos de Destino</h6>
          <FormDireccion
            inputValue={formData?.direccion_destino}
            errorValue={formErrors?.direccion_destino}
            handleFormChange={handleFormChange}
            formData={formData}
            formErrors={formErrors}
            objName={"direccion_destino"}
          />
        </div>
        <div className="grid">
          <div className="col-12 mt-3 flex justify-content-end">
            <Button
              label="Guardar y Continuar"
              className="p-button-sm p-button-success mr-2"
            />
          </div>
        </div>
      </form>
    </>
  );
}
