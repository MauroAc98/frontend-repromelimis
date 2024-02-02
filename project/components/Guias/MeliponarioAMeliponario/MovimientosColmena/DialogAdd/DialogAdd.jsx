import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { Button } from "primereact/button";
import useCustomForm from "@/base/hooks/useCustomForm";
import ColmenaData from "./ColmenaData";
import { InputNumber } from "@/base/components/Form/InputNumber";
import Media from "@/base/components/Media/Media";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import { formatMultipartFormData } from "@/base/helpers/utils";

export default function DialogAdd(props) {
  const {
    formData,
    setFormData,
    handleFormChange,
    handleSetFormErrors,
    formErrors,
    setFormErrors,
  } = useCustomForm();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { getSolicitudActual } = useSolicitudGuiaContext();

  const onHideDialog = () => {
    props.setShowDialog(false);
  };

  const validateForm = () => {
    let valid = true;
    if (
      !formData?.cantidad_a_trasladar ||
      formData?.cantidad_a_trasladar === ""
    ) {
      valid = false;
      handleSetFormErrors("cantidad_a_trasladar", "Campo requerido");
    }
    return valid;
  };

  const onSubmitForm = async () => {
    if (validateForm()) {
      try {
        showBackdropLoader();

        const array_keys = ["foto_certificacion"];
        const _data = formatMultipartFormData(array_keys, formData);
        const { data } = await api.post(
          "/movimientos-guias/add-tmp-meli-a-meli",
          _data,
          MEDIA_HEADERS
        );

        // Si todo esta OK, actualizamos tabla y ocultamos dialog
        showSuccessMsg(data.message);
        onHideDialog();
        getSolicitudActual();
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  /** Limpiamos formData cada vez que abrimos dialog */
  useEffect(() => {
    if (props.showDialog) {
      setFormData(null);
      setFormErrors(null);
    }
  }, [props.showDialog]);

  return (
    <>
      <Dialog
        header={"Agregar movimiento"}
        visible={props.showDialog}
        style={{ width: "80vw" }}
        footer={null}
        onHide={onHideDialog}
        position={"center"}
      >
        <ColmenaData
          formData={formData}
          setFormData={setFormData}
          type="ORIGEN"
        />
        {formData?.colmena_origen && (
          <ColmenaData
            formData={formData}
            setFormData={setFormData}
            type="DESTINO"
          />
        )}
        {formData?.colmena_destino && (
          <div className="grid mt-3">
            <div className="col-12 lg:col-6">
              <div className="text-base mb-2">Cantidad a trasladar</div>
              <InputNumber
                className={`${
                  formErrors?.cantidad_a_trasladar && "p-invalid"
                } w-full`}
                name="cantidad_a_trasladar"
                value={formData?.cantidad_a_trasladar ?? ""}
                onChange={handleFormChange}
                min={1}
                useGrouping={false}
              />
              {formErrors?.cantidad_a_trasladar && (
                <small className="p-error block">
                  {formErrors?.cantidad_a_trasladar}
                </small>
              )}
            </div>
            <div className="col-12 lg:col-6">
              <Media
                acceptImages
                label="Foto de colmena"
                name="foto_colmena"
                onChange={handleFormChange}
                value={formData?.foto_colmena}
              />
              <div className="mt-3">
                <i>
                  Se debe observar el REGISTRO PROVINCIAL DE MELIPONICULTORES DE
                  LA PROVINCIA DE MISIONES (ReProMeliMis)
                </i>
              </div>
            </div>

            <div className="col-12 mt-3 flex justify-content-end">
              <Button
                label="Guardar"
                className="p-button-sm p-button-success mr-2"
                onClick={onSubmitForm}
              />
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
