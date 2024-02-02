import { Dropdown } from "primereact/dropdown";
import FloatInput from "../../../base/components/Form/FloatInput";
import { useEffect, useState } from "react";
import Media from "../../../base/components/Media/Media";
import useCustomForm from "@/base/hooks/useCustomForm";
import { Button } from "primereact/button";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import { formatMultipartFormData } from "@/base/helpers/utils";
import { useRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { useUserContext } from "@/base/context/userContext";

export default function FormAcredCapa() {
  const { user } = useUserContext();
  const router = useRouter();
  const {
    formData,
    setFormData,
    handleFormChange,
    handleSetFormErrors,
    formErrors,
  } = useCustomForm();
  const { datosTramite, datosCapacitacion, getTramiteActual } =
    useTramiteContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const [blockDialogData, setBlockDialogData] = useState({
    mensajeDialog:
      "Al guardar el tipo de capacitación actual, sólo podrá ingresar datos del productor o modificar datos de capacitación. ¿Desea continuar?",
    titleDialog: "ATENCIÓN",
    open: false,
  });

  const trainings = [
    { label: "Título habilitante", value: "TITULO" },
    {
      label:
        "Certificado/constancias de acreditación de curso de meliponicultura",
      value: "CERTIFICADO_CURSO",
    },
    {
      label: "Trabajo de investigaciones/ publicaciones sobre meliponicultura",
      value: "TRABAJO_INVESTIGACION",
    },
    ...(user.requiere_capacitacion
      ? []
      : [
          {
            label: "No cuento con capacitación. Deseo realizarla",
            value: "SIN_CAPACITACION_DESEA_REALIZAR",
          },
        ]), //incluye el item solo si el usuario no tiene esa marca
    { label: "Otros", value: "OTROS" },
  ];

  const sendForm = () => {
    if (validateForm()) {
      if (formData?.tipo_capacitacion === "SIN_CAPACITACION_DESEA_REALIZAR") {
        setBlockDialogData({
          ...blockDialogData,
          open: true,
        });
      } else {
        executeEndpoint();
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!formData?.tipo_capacitacion || formData?.tipo_capacitacion === "") {
      valid = false;
      handleSetFormErrors("tipo_capacitacion", "Campo requerido");
    } else {
      handleSetFormErrors("tipo_capacitacion", "");
    }

    if (
      (!formData?.foto_certificacion || formData?.foto_certificacion === "") &&
      formData?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
    ) {
      valid = false;
      showErrorMsg("Debe adjuntar una foto");
    } else {
      handleSetFormErrors("foto_certificacion", "");
    }

    return valid;
  };
  const onDeleteFotoCopia = async () => {
    showBackdropLoader();
    try {
      if (datosCapacitacion?.foto_certificacion) {
        await api.delete(
          `/media/destroy-byid/${datosCapacitacion.foto_certificacion.id}`,
          null
        );
        setFormData({
          ...formData,
          foto_certificacion: null,
        });
      }
      setBlockDialogData({
        ...blockDialogData,
        open: false,
      });
      executeEndpoint();
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const executeEndpoint = async () => {
    showBackdropLoader();
    try {
      const array_keys = ["foto_certificacion"];
      const _data = formatMultipartFormData(array_keys, formData);
      const { data } = await api.post(
        `tramites/acreditar-capacitacion`,
        _data,
        MEDIA_HEADERS
      );
      showSuccessMsg(data.message);
      getTramiteActual();
      formData.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
        ? router.push("/tramites/meliponarios")
        : router.push("/tramites");
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Continuar"
        className="p-button"
        onClick={onDeleteFotoCopia}
      />
      <Button
        label="Cancelar"
        onClick={() => getTramiteActual()}
        className="p-button-danger p-button-text"
      />
    </div>
  );

  useEffect(() => {
    setFormData(datosCapacitacion);
  }, []);

  return (
    <>
      <Dialog
        draggable={false}
        header={blockDialogData.titleDialog}
        style={{
          width: "40%",
          "@media (minWidth: 768px)": {
            width: "20%",
          },
        }}
        visible={blockDialogData.open}
        footer={footerContent}
        closable={true}
        onHide={() => getTramiteActual()}
      >
        <p>{blockDialogData.mensajeDialog}</p>
      </Dialog>
      <div className="grid flex md:flex-column">
        <FloatInput
          className="mt-2 col-12  md:col-6 lg:col-4"
          label="Tipo capacitación"
          errorName="tipo_capacitacion"
          formErrors={formErrors}
        >
          <Dropdown
            name="tipo_capacitacion"
            value={formData?.tipo_capacitacion ?? ""}
            options={trainings}
            onChange={handleFormChange}
            className={`p-inputtext-sm w-full ${
              formErrors?.tipo_capacitacion && "p-invalid"
            }`}
          />
        </FloatInput>
        {formData?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR" && (
          <div className="mt-2 col-12">
            <Media
              acceptImages
              label="Foto copia"
              name="foto_certificacion"
              onChange={handleFormChange}
              value={formData?.foto_certificacion}
            />
            <div className="col-10 py-3 font-italic text-justify text-sm ">
              Adjuntar foto de la copia previamente certificada por policía de
              la provincia, juzgado de paz o escribanía de dicha documentación.
            </div>
          </div>
        )}

        {user.requiere_capacitacion && (
          <div className="col-10 text-sm">
            <i className="pi pi-info-circle mr-2 font-bold text-xl text-yellow-600"></i>
            <span className="font-bold">
              Anteriormente usted solicitó que deseaba recibir capacitación, por
              favor suba el certificado de finalización para que su trámite
              pueda ser evaluado.
            </span>
          </div>
        )}

        <div className="mt-3 flex justify-content-end col-12">
          <Button
            className="p-button-sm"
            type="submit"
            label="Guardar y Continuar"
            onClick={sendForm}
          ></Button>
        </div>
      </div>
    </>
  );
}
