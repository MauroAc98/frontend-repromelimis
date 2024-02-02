import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useGeneralContext } from "@/base/context/GeneralContext";
import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { maskNroRepromelimis } from "@/project/helpers/utils";

export default function Search(props) {
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const [searchNro, setSearchNro] = useState(null);

  const handleChangeInput = ({ target }) => {
    setSearchNro(target.value);
    // Limpiamos error
    props.handleSetFormErrors("productor_responsable", null);
  };

  const handleBlur = ({ target }) => {
    const value = maskNroRepromelimis(target.value);
    setSearchNro(value);
  };

  const handleSearch = async (e) => {
    try {
      showBackdropLoader();
      const { data } = await api.get("/productores/get-by-nro-repromelimis", {
        params: {
          nro: searchNro,
        },
      });
      // Asignamos datos a formData
      props.setFormData((prevVal) => ({
        ...prevVal,
        productor_responsable: data,
      }));
      showSuccessMsg("Meliponicultor encontrado con exito!");
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  return (
    <>
      <div className="p-inputgroup w-full lg:w-5">
        <InputText
          placeholder="Ingrese N° de ReProMeliMis"
          onChange={handleChangeInput}
          onBlur={handleBlur}
          value={searchNro ?? ""}
          className={`${
            props.formErrors?.productor_responsable && "p-invalid"
          }`}
        />
        {searchNro && (
          <Button
            icon="pi pi-search"
            className="p-button-primary"
            type="button"
            onClick={handleSearch}
          />
        )}
      </div>
      {props.formErrors?.productor_responsable && (
        <small className="p-error block">
          Indique el meliponicultor responsable
        </small>
      )}
    </>
  );
}
