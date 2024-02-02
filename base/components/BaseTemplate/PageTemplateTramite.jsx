import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import FloatInput from "../Form/FloatInput";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useRouter } from "next/router";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import CartMessage from "@/project/components/CartMessage";
import HeaderTemplate from "@/project/components/Tramites/HeaderTemplate";
import { Divider } from "primereact/divider";

export default function PageTemplateTramite({ title, iconTitle, children }) {
  const [actualRoute, setActualRoute] = useState("");
  const { requestStatus, datosCapacitacion, datosTramite } =
    useTramiteContext();
  const router = useRouter();

  const routes = [
    { label: "Productor", value: "/tramites/productores" },
    datosTramite?.tipo_tramite == "INSCRIPCION"
      ? { label: "Acreditación Capacitación", value: "/tramites/acred-capa" }
      : null,
    datosCapacitacion?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
      ? { label: "Meliponarios", value: "/tramites/meliponarios" }
      : null,
    datosCapacitacion?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
      ? {
          label: "Productos y Comercialización",
          value: "/tramites/prod-comercializacion",
        }
      : null,
    datosCapacitacion?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
      ? { label: "Extracción de miel", value: "/tramites/extraccion-miel" }
      : null,
    datosCapacitacion?.tipo_capacitacion !== "SIN_CAPACITACION_DESEA_REALIZAR"
      ? { label: "Actividades Complementarias", value: "/tramites/act-compl" }
      : null,
  ].filter((route) => route !== null);

  const evalShowDropdown = () => {
    // Si es una ACTUALIZACION y estoy en la pag de acred-capa, no muestro dropdown
    if (
      datosTramite?.tipo_tramite == "ACTUALIZACION" &&
      router.pathname == "/tramites/acred-capa"
    ) {
      return <></>;
    }

    return (
      <FloatInput
        label="Formulario"
        className="container_dropdown_routes w-full sm:w-auto"
      >
        <Dropdown
          value={actualRoute}
          options={routes}
          onChange={onChangeActualRoute}
          className="p-inputtext-sm w-full sm:w-auto"
        />
      </FloatInput>
    );
  };

  useEffect(() => {
    const matchedRoute = routes.find((route) => route.value == router.pathname);
    if (matchedRoute) {
      setActualRoute(matchedRoute.value);
    } else if (router.pathname == "/tramites/meliponarios/colmenas") {
      setActualRoute("/tramites/meliponarios");
    }
  }, [router.pathname]);

  const onChangeActualRoute = (e) => {
    setActualRoute(e.value);
    router.push(e.value);
  };

  return (
    <div className="card">
      {requestStatus === "LOADING" ? (
        <SimpleLoader />
      ) : requestStatus === "ERROR" ? (
        <CartMessage
          titulo="ERROR"
          mensaje={"No se pudo recuperar los datos del trámite actual"}
          tituloBoton="Volver a mis trámites"
          classIcon="pi pi-times"
          url="/tramites"
          colorIcon="red"
        />
      ) : (
        <>
          <HeaderTemplate />
          {title && (
            <>
              <div className="container_page_template">
                <div className="page_title p-0 pb-4">
                  <i className={iconTitle} /> {title}
                </div>
                {evalShowDropdown()}
              </div>
            </>
          )}
          <Divider />
          <div className="mt-6">{children}</div>
        </>
      )}
    </div>
  );
}
