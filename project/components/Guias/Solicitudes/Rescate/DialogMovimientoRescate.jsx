import useCustomForm from "@/base/hooks/useCustomForm";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import FloatInput from "@/base/components/Form/FloatInput";
import { InputTextarea } from "primereact/inputtextarea";
import useGetEspecies from "@/project/hooks/endpointsHooks/useGetEspecies";
import Media from "@/base/components/Media/Media";
import { Button } from "primereact/button";
import { formatMultipartFormData } from "@/base/helpers/utils";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import { SITIOS_GUIAS } from "@/pages/guias-traslado/solicitudes";
export default function DialogMovimientoRescate(props) {
  const {
    formData,
    setFormData,
    handleFormChange,
    handleSetFormErrors,
    formErrors,
    resetForm,
  } = useCustomForm();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const { getSolicitudActual } = useSolicitudGuiaContext();
  const [especies, setEspecies] = useState({
    requestStatus: "LOADING",
    data: [],
  });

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

  useEffect(() => {
    getEspecies();
  }, []);

  const opciones = [
    { label: "SI", value: true },
    { label: "NO", value: false },
  ];

  const validateForm = () => {
    let valid = true;

    return valid;
  };

  const sendForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      showBackdropLoader();
      try {
        const array_keys = ["foto_colmena", "foto_panoramica"];
        const _data = formatMultipartFormData(array_keys, formData);
        const { data } = await api.post(
          `/movimientos-guias/add-tmp-rescate`,
          _data,
          MEDIA_HEADERS
        );
        setFormData([]);
        showSuccessMsg(data.message);
        props.onHideForm();
        getSolicitudActual();
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  return (
    <Dialog
      header={"Nuevo movimiento de colmena"}
      visible={props.showForm}
      style={{ width: "80vw" }}
      footer={null}
      onHide={props.onHideForm}
      position={"center"}
    >
      <form onSubmit={sendForm}>
        <div className="grid">
          <FloatInput
            className="col-6"
            errorName="colmena_instalada_tronco"
            label="Colmena instalada en seccion de tronco, tora, torita"
            formErrors={formErrors}
          >
            <Dropdown
              name="colmena_instalada_tronco"
              value={formData?.colmena_instalada_tronco ?? ""}
              onChange={handleFormChange}
              options={opciones}
              className={`p-inputtext-sm w-full ${
                formErrors?.colmena_instalada_tronco && "p-invalid "
              }`}
            />
          </FloatInput>

          <FloatInput
            className="col-6"
            label="Sitio donde se encuentra la colmena a trasladar"
            errorName="sitio_traslado"
            formErrors={formErrors}
          >
            <Dropdown
              name="sitio_traslado"
              value={formData?.sitio_traslado ?? ""}
              onChange={handleFormChange}
              options={SITIOS_GUIAS}
              placeholder="Sitio donde se encuentra la colmena a trasladar"
              className={`p-inputtext-sm w-full ${
                formErrors?.sitio_traslado && "p-invalid "
              }`}
            />
          </FloatInput>

          {formData?.colmena_instalada_tronco == true && (
            <FloatInput
              className="col-6 mt-2"
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
          )}

          {formData?.colmena_instalada_tronco == false && (
            <FloatInput
              className="col-6 mt-2"
              label="Lugar donde se encuentra instalda. Ej: muro, paredes, ventanas, etc"
              errorName="lugar_instalada"
              formErrors={formErrors}
            >
              <InputTextarea
                className={`${formErrors?.lugar_instalada && "p-invalid"}`}
                name="lugar_instalada"
                value={formData?.lugar_instalada ?? ""}
                onChange={handleFormChange}
                rows={4}
              />
            </FloatInput>
          )}

          <FloatInput
            className="col-6 mt-2"
            label="Largo de la seccion en centimetros"
            errorName="largo_seccion"
            formErrors={formErrors}
          >
            <InputText
              className={`${formErrors?.largo_seccion && "p-invalid"}`}
              name="largo_seccion"
              value={formData?.largo_seccion}
              onChange={handleFormChange}
              type="number"
            />
          </FloatInput>

          <div className="col-3">
            <Media
              acceptImages
              label="Foto Colmena"
              name="foto_colmena"
              onChange={handleFormChange}
              value={formData?.foto_colmena}
            />
          </div>
          <div className="col-3">
            <Media
              acceptImages
              label="Foto Panoramica"
              name="foto_panoramica"
              onChange={handleFormChange}
              value={formData?.foto_panoramica}
            />
          </div>
          <div className="col-12">
            <div className="col-12 mt-3 flex justify-content-end">
              <Button
                label="Guardar"
                className="p-button-sm p-button-success mr-2"
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
