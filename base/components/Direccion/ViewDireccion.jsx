import { useRef, useState } from "react";
import SectionLoader from "@/base/components/Loader/SectionLoader";

export default function ViewDireccion(props) {
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <>
      {/* DATOS DIRECCION */}
      <div className="col-12 md:col-6">
        <div className="grid">
          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Departamento</label>
            <div className="mt-1">{props.inputValue?.departamento?.nombre ?? ""}</div>
          </div>
          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Localidad</label>
            <div className="mt-1">{props.inputValue?.localidad?.nombre ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Calle</label>
            <div className="mt-1">{props.inputValue?.calle ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Altura</label>
            <div className="mt-1">{props.inputValue?.altura ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Piso</label>
            <div className="mt-1">{props.inputValue?.piso ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Seccion</label>
            <div className="mt-1">{props.inputValue?.seccion ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Chacra</label>
            <div className="mt-1">{props.inputValue?.chacra ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Manzana</label>
            <div className="mt-1">{props.inputValue?.manzana ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Parcela</label>
            <div className="mt-1">{props.inputValue?.parcela ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Subparcela</label>
            <div className="mt-1">{props.inputValue?.subparcela ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Partida</label>
            <div className="mt-1">{props.inputValue?.partida ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Paraje</label>
            <div className="mt-1">{props.inputValue?.paraje ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Colonia</label>
            <div className="mt-1">{props.inputValue?.colonia ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Lote</label>
            <div className="mt-1">{props.inputValue?.lote ?? ""}</div>
          </div>

          <div className="col-12 md:col-6 mt-3">
            <label className="font-bold">Idgis</label>
            <div className="mt-1">{props.inputValue?.idgis ?? ""}</div>
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6">
        <div>
          {!iframeLoaded && <SectionLoader />}
          <iframe
            ref={iframeRef}
            className="iframeContainerStyle"
            src={`https://maps.google.com/maps?q=${props.inputValue?.latitud},${props.inputValue?.longitud}&hl=es&z=10&output=embed`}
            width="100%"
            height="372"
            title="Google Maps"
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>
    </>
  );
}
