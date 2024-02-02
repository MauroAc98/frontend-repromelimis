import React from "react";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";

const DatosAcreditacion = ({ data }) => {

  const TemplateAcreditacion = (value) => {
    switch (value) {
      case "TITULO":
        return "Título habilitante";
      case "CERTIFICADO_CURSO":
        return "Certificado/constancias de acreditación de curso de meliponicultura";
      case "TRABAJO_INVESTIGACION":
        return "Trabajo de investigaciones/ publicaciones sobre meliponicultura";
      case "SIN_CAPACITACION_DESEA_REALIZAR":
        return "No cuento con capacitación. Deseo realizarla";
      case "OTROS":
        return "Otros";
    }
  };
  return (
    <div className="grid p-3">
      <div className="field col-12 md:col-6">
        <span className="p-float-label">
          <InputText
            id="tipo_capacitacion"
            value={TemplateAcreditacion(data.tipo_capacitacion)}
            readOnly
          />
          <label htmlFor="tipo_capacitacion">Tipo de capacitación</label>
        </span>
      </div>
      <div className="field col-12 md:col-6">
        <p className="mb-2 ml-2 text-sm ">Foto Certficación</p>
        <Image
          src={data?.foto_certificacion?.original_url}
          width="200"
          alt="Imagen certificacion"
          preview
        />
      </div>
    </div>
  );
};

export default DatosAcreditacion;
