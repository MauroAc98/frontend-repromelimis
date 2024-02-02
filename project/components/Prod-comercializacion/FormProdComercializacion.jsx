import { Dropdown } from "primereact/dropdown";
import FloatInput from "../../../base/components/Form/FloatInput";
import { useEffect, useState } from "react";
import useCustomForm from "@/base/hooks/useCustomForm";
import { Button } from "primereact/button";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import {
  getAuthMsg,
  getResponseError,
  removeAuthMsg,
} from "@/base/helpers/api";
import { InputText } from "primereact/inputtext";
import { useTramiteContext } from "@/project/context/TramiteContext";
import api, { MEDIA_HEADERS } from "@/base/helpers/api";
import useGetProductos from "@/base/hooks/endpointsHooks/useGetProductos";
import SimpleLoader from "../../../base/components/Loader/SimpleLoader";

export default function FormProdComercializacion(props) {
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
  const { datosTramite, getTramiteActual } = useTramiteContext();
  const [productoOptions, setProductoOptions] = useState({
    requestStatus: "LOADING",
    data: [],
  });

  const { getProductos } = useGetProductos(onSuccessGetProductos);

  function onSuccessGetProductos(response) {
    setProductoOptions({
      requestStatus: "SUCCESS",
      data: response,
    });
  }

  const tipo_comercializacion = [
    { label: "ACOPIADOR", value: "ACOPIADOR" },
    { label: "COOPERATIVA", value: "COOPERATIVA" },
    { label: "DIRECTA", value: "DIRECTA" },
    { label: "NO COMERCIALIZA", value: "NO COMERCIALIZA" },
    { label: "OTROS", value: "OTROS" },
  ];

  const sendForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      showBackdropLoader();
      try {
        const url =
          props.submitAction == "add"
            ? `prod-comercializacion/create`
            : `/prod-comercializacion/edit-tmp/${formData.id}`;

        const { data } = await api.post(url, formData);
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

  const validateForm = () => {
    let valid = true;
    if (!formData?.id_producto || formData?.id_producto === "") {
      valid = false;
      handleSetFormErrors("id_producto", "Campo requerido");
    } else {
      handleSetFormErrors("id_producto", "");
    }

    if (!formData?.cantidad || formData?.cantidad === "") {
      valid = false;
      handleSetFormErrors("cantidad", "Campo requerido");
    } else {
      handleSetFormErrors("cantidad", "");
    }

    if (
      !formData?.tipo_comercializacion ||
      formData?.tipo_comercializacion === ""
    ) {
      valid = false;
      handleSetFormErrors("tipo_comercializacion", "Campo requerido");
    } else {
      handleSetFormErrors("tipo_comercializacion", "");
    }

    return valid;
  };

  const checkMsgs = () => {
    const msg = getAuthMsg();
    if (msg) {
      showSuccessMsg(msg, true);
      removeAuthMsg();
    }
  };
  const handleClickClean = () => {
    props.setSubmitAction("add");
    props.setEditData(null);
    resetForm();
  };

  const evalUnidadMedida = () => {
    const findProduct = productoOptions.data.find(
      (item) => item.id == formData?.id_producto
    );
    if (findProduct) {
      switch (findProduct.unidad_medida) {
        case "GR":
          return "(Gramos)";
        case "U":
          return "(Unidades)";
        default:
          return "";
      }
    }
    return "";
  };

  useEffect(() => {
    if (props.editData) {
      setFormData(props.editData);
    } else {
      handleClickClean();
    }
  }, [props.editData]);

  useEffect(() => {
    checkMsgs();
    getProductos();
  }, []);

  if (productoOptions.requestStatus == "LOADING") {
    return (
      <div className="col-12">
        <SimpleLoader />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={sendForm}>
        <div className="mt-7 grid">
          <div className="py-3 col-12">
            <p>*Las cantidades son totales de los últimos doce(12) meses.</p>
          </div>
          <FloatInput
            className="mt-2 col-12 md:col-4"
            label="Producto"
            errorName="id_producto"
            formErrors={formErrors}
          >
            <Dropdown
              name="id_producto"
              value={formData?.id_producto ?? ""}
              optionValue="id"
              optionLabel="nombre_producto"
              options={productoOptions.data}
              onChange={handleFormChange}
              className={`p-inputtext-sm w-full ${
                formErrors?.id_producto && "p-invalid"
              }`}
            />
          </FloatInput>

          <FloatInput
            className="mt-2 col-12 md:col-4"
            label={`Cantidad ${evalUnidadMedida()}`}
            errorName="cantidad"
            formErrors={formErrors}
          >
            <InputText
              autoComplete="off"
              className={`${formErrors?.cantidad && "p-invalid"}`}
              name="cantidad"
              value={formData?.cantidad ?? ""}
              onChange={handleFormChange}
              keyfilter="int"
            />
          </FloatInput>

          <FloatInput
            className="mt-2 col-12 md:col-4"
            label="Tipo de comercialización"
            errorName="tipo_comercializacion"
            formErrors={formErrors}
          >
            <Dropdown
              name="tipo_comercializacion"
              value={formData?.tipo_comercializacion ?? ""}
              options={tipo_comercializacion}
              onChange={handleFormChange}
              className={`p-inputtext-sm w-full ${
                formErrors?.tipo_comercializacion && "p-invalid "
              }`}
            />
          </FloatInput>
        </div>
        <div className="mt-3 flex justify-content-center gap-2">
          <Button
            type="submit"
            label="Guardar"
            className="w-full md:w-2 md:p-2"
          ></Button>
          <Button
            type="button"
            label="Limpiar"
            className="w-full md:w-2 md:p-2 p-button-secondary"
            onClick={handleClickClean}
          />
        </div>
      </form>
    </>
  );
}
