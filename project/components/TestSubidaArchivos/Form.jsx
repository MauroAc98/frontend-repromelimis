import FloatInput from "@/base/components/Form/FloatInput";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api, { MEDIA_HEADERS } from "@/base/helpers/api";
import Media from "@/base/components/Media/Media";
import MediaMultiple from "@/base/components/Media/MediaMultiple";
import { useEffect } from "react";
import { formatMultipartFormData } from "@/base/helpers/utils";

export default function Form({
  formData,
  handleFormChange,
  setFormData,
  setContent,
  formAction,
}) {
  const handleCancel = () => {
    setContent("list");
    setFormData(null);
  };

  const handleSubmit = async () => {
    // Definimos cuales seran los inputs tipo archivo, para no agregar todos los campos a mi FormData
    const array_keys = ["imagen_perfil", "titulo", "galeria[]"];
    // Crear el FormData
    const _data = formatMultipartFormData(array_keys, formData);

    try {
      let response = null;
      // ADD
      if (formAction == "add") {
        response = await api.post(`/test-archivos/add`, _data, MEDIA_HEADERS);
      } else {
        // EDIT
        response = await api.post(
          `/test-archivos/edit/${formData.id}`,
          _data,
          MEDIA_HEADERS
        );
      }

      //   Limpiamos form
      setContent("list");
      setFormData(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid">
      <FloatInput className="col-6" label="Descripcion">
        <InputText
          autoComplete="off"
          name="descripcion"
          value={formData?.descripcion ?? ""}
          onChange={handleFormChange}
        />
      </FloatInput>
      <div className="col-6">
        <Media
          acceptImages
          label="Imagen de perfil"
          name="imagen_perfil"
          onChange={handleFormChange}
          value={formData?.imagen_perfil}
        />
      </div>
      <div className="col-6">
        <Media
          acceptPdf
          label="Titulo"
          name="titulo"
          onChange={handleFormChange}
          value={formData?.titulo}
        />
      </div>

      <div className="col-6">
        <MediaMultiple
          acceptImages
          label="Galeria"
          name="galeria"
          onChange={handleFormChange}
          value={formData?.galeria}
        />
      </div>

      <div className="col-12">
        <Button
          label="Guardar"
          className="p-button-success mr-2"
          onClick={handleSubmit}
        />
        <Button
          label="Cancelar"
          className="p-button-danger"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
}
