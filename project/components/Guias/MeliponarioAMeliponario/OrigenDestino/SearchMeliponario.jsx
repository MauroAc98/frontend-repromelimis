import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useGeneralContext } from "@/base/context/GeneralContext";
import api, { getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { maskNroRepromelimis } from "@/project/helpers/utils";

export default function SearchMeliponario({ type, setFormData }) {
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();
  const [searchNroMeliponario, setSearchNroMeliponario] = useState(null);
  const [searchNroRepromelimis, setSearchNroRepromelimis] = useState(null);

  const handleChangeNroMeliponario = ({ target }) => {
    setSearchNroMeliponario(target.value);
  };

  const handleChangeNroRepromelimis = ({ target }) => {
    setSearchNroRepromelimis(target.value);
  };

  const handleBlurNroRepromelimis = ({ target }) => {
    const value = maskNroRepromelimis(target.value);
    setSearchNroRepromelimis(value);
  };

  // Evaluo que buscar
  const handleSearch = async () => {
    try {
      showBackdropLoader();
      const { data } = await api.get("/meliponarios/find-meliponario-guia", {
        params: {
          type: type,
          nro_meliponario: searchNroMeliponario,
          nro_repromelimis: searchNroRepromelimis,
        },
      });

      if (type == "ORIGEN") {
        // Seteamos en formData
        setFormData((prevVal) => ({ ...prevVal, meliponario_origen: data }));
      } else if (type == "DESTINO") {
        // Seteamos en formData
        setFormData((prevVal) => ({ ...prevVal, meliponario_destino: data }));
      }

      showSuccessMsg(`Meliponario ${type} encontrado con exito!`);
    } catch (error) {
      showErrorMsg(getResponseError(error));
    } finally {
      hideBackdropLoader();
    }
  };

  return (
    <>
      {type == "ORIGEN" ? (
        <div className="p-inputgroup w-full lg:w-5">
          <InputText
            placeholder={"Ingrese N° Meliponario"}
            onChange={handleChangeNroMeliponario}
            value={searchNroMeliponario ?? ""}
          />
          {searchNroMeliponario && (
            <Button
              icon="pi pi-search"
              className="p-button-primary"
              type="button"
              onClick={handleSearch}
            />
          )}
        </div>
      ) : (
        <div className="grid">
          <div className="col-12 lg:col-6">
            <InputText
              placeholder={"Ingrese N° ReProMeliMis"}
              onChange={handleChangeNroRepromelimis}
              onBlur={handleBlurNroRepromelimis}
              value={searchNroRepromelimis ?? ""}
            />
          </div>

          <div className="p-inputgroup  col-12 lg:col-6">
            <InputText
              placeholder={"Ingrese N° Meliponario"}
              onChange={handleChangeNroMeliponario}
              value={searchNroMeliponario ?? ""}
            />
            {searchNroMeliponario && searchNroRepromelimis && (
              <Button
                icon="pi pi-search"
                className="p-button-primary"
                type="button"
                onClick={handleSearch}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
