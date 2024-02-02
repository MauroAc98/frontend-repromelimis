import { Button } from "primereact/button";
import Map from "@/base/components/Map/Map";
import FloatInput from "@/base/components/Form/FloatInput";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useEffect } from "react";

export default function MapWithCoords(props) {
  const [initialMarker, setInitialMarker] = useState(null);

  const setLat = (value) => {
    const event = {
      target: {
        name: `${props.objName ? `${props.objName}.` : ""}latitud`, //concatena . si es necesario
        value: value,
      },
    };
    props.handleFormChange(event);
  };

  const setLong = (value) => {
    const event = {
      target: {
        name: `${props.objName ? `${props.objName}.` : ""}longitud`, //concatena . si es necesario
        value: value,
      },
    };
    props.handleFormChange(event);
  };

  /** Colocar marker de acuerdo a las coordenanas que tenemos */
  const ubicarCoordenadas = () => {
    if (props.inputValue?.latitud && props.inputValue?.longitud) {
      setInitialMarker({
        lat: parseFloat(props.inputValue?.latitud),
        lng: parseFloat(props.inputValue?.longitud),
      });
    }
  };

  /** Detectamos si le pasamos coordenadas, y si ademas son diferentes de 0, para colocar el marker en mapa */
  useEffect(() => {
    if (props.inputValue?.latitud && props.inputValue?.longitud) {
      if (props.inputValue?.latitud != 0 && props.inputValue?.longitud != 0) {
        setInitialMarker({
          lat: parseFloat(props.inputValue?.latitud),
          lng: parseFloat(props.inputValue?.longitud),
        });
      }
    }
  }, []);

  return (
    <div className="grid">
      <div className="col-12">
        <Map
          setLong={setLong}
          setLat={setLat}
          initialMarker={initialMarker}
        />
      </div>
      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Latitud"
        errorName={`${props.objName ? `${props.objName}.` : ""}latitud`} //concatena . si es necesario
        formErrors={props.formErrors}
      >
        <InputText
          className={`${props.errorValue?.latitud && "p-invalid"}`}
          name={`${props.objName ? `${props.objName}.` : ""}latitud`} //concatena . si es necesario
          value={props.inputValue?.latitud ?? ""}
          onChange={props.handleFormChange}
          autoComplete="off" // Desactivar el autocompletado
        />
      </FloatInput>

      <FloatInput
        className="col-12 md:col-6 mt-3"
        label="Longitud"
        errorName={`${props.objName ? `${props.objName}.` : ""}longitud`} //concatena . si es necesario
        formErrors={props.formErrors}
      >
        <InputText
          className={`${props.errorValue?.longitud && "p-invalid"}`}
          name={`${props.objName ? `${props.objName}.` : ""}longitud`} //concatena . si es necesario
          value={props.inputValue?.longitud ?? ""}
          onChange={props.handleFormChange}
          autoComplete="off" // Desactivar el autocompletado
        />
      </FloatInput>

      <div className="col-12">
        <Button
          type="button"
          label="Ubicar coordenadas"
          onClick={ubicarCoordenadas}
          className="p-button-sm w-full"
        />
      </div>
    </div>
  );
}
