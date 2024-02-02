import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import FloatInput from "@/base/components/Form/FloatInput";
import { useRouter } from "next/router";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import CartMessage from "@/project/components/CartMessage";
import { Divider } from "primereact/divider";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";

export default function PageTemplateSolicitud({ title, iconTitle, children }) {
  const [actualRoute, setActualRoute] = useState("");
  const { requestStatus } = useSolicitudGuiaContext();
  const router = useRouter();

  const routes = [
    {
      label: "Datos iniciales",
      value: "/guias-traslado/solicitudes/datos-iniciales",
    },
    {
      label: "Origen y destino",
      value: "/guias-traslado/solicitudes/origen-destino",
    },
    {
      label: "Movimientos de colmenas",
      value: "/guias-traslado/solicitudes/movimientos-colmenas",
    },
  ].filter((route) => route !== null);

  const evalShowDropdown = () => {
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
          mensaje={"No se pudo recuperar los datos de la solicitud actual"}
          tituloBoton="Volver a mis solicitudes"
          classIcon="pi pi-times"
          url="/guias-traslado/solicitudes"
          colorIcon="red"
        />
      ) : (
        <>
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
