import React from "react";
import { InputText } from "primereact/inputtext";
const DatosTramite = ({ data }) => {
  const TemplateEstado = (value) => {
    switch (value) {
      case "EN_CARGA":
        return "EN CARGA";
      case "EN_ESPERA_APROBACION":
        return "EN ESPERA DE APROBACION";
      case "APROBADO":
        return "APROBADO";
      case "RECHAZADO":
        return "RECHAZADO";
      case "FALTA_DOC":
        return "FALTA DOCUMENTACIÓN";
      case "REQUIERE_CAPACITACION":
        return "REQUIERE CAPACITACION";
    }
  };

  return (
    <div className="p-fluid grid p-3">
      <div className="field col-12 md:col-4">
        <span className="p-float-label">
          <InputText id="nro_tramite" value={data.nro} readOnly />
          <label htmlFor="nro_tramite">Nro de trámite</label>
        </span>
      </div>
      <div className="field col-12 md:col-4">
        <span className="p-float-label">
          <InputText id="tipo_tramite" value={data.tipo_tramite} readOnly />
          <label htmlFor="tipo_tramite">Tipo de trámite</label>
        </span>
      </div>
      <div className="field col-12 md:col-4">
        <span className="p-float-label">
          <InputText
            id="estado_actual"
            value={TemplateEstado(data.estado_actual)}
            readOnly
          />
          <label htmlFor="estado_actual">Estado actual</label>
        </span>
      </div>
    </div>
  );
};

export default DatosTramite;
