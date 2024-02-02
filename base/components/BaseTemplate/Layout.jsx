import React, { useEffect, useRef, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useUserContext } from "@/base/context/userContext";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();
  // Datos de usuario
  const { user } = useUserContext();

  const sidebarRef = useRef(null);
  const containerDiv = useRef(null);
  const [menuState, setMenuState] = useState("open");
  const [mobileActive, setMobileActive] = useState(false);
  const [classNames, setClassNames] = useState("");

  /** Cada vez que se haga un resize de la pagina*/
  useEffect(() => {
    // Creamos una funcion para luego removerla al desmontar el componente
    const onResizeWindow = () => {
      if (window.innerWidth <= 991) {
        // Activamos la vista mobile y ocultamos el sidebar
        setMobileActive(true);
        setMenuState("hide");
      } else {
        setMobileActive(false);
      }
    };

    // Llamamos la primera vez
    onResizeWindow();

    window.addEventListener("resize", onResizeWindow);

    // Removemos el listener para ejecutarlo solo cuando se monta el componente
    return () => {
      window.removeEventListener("resize", onResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (menuState === "hide") {
      setClassNames(classNames + " layout_sidebar_inactive");
    } else if (menuState === "open") {
      setClassNames("");
      // Si estamos en vista mobile y abrimos el sidebar, colocamos la sgte clase
      if (mobileActive) {
        setClassNames("layout_mobile_active");
      }
    }
  }, [menuState, mobileActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      /** Si hizo un click fuera del div y tengo activo el sidebar lo oculto */
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (containerDiv.current.className.includes("layout_mobile_active")) {
          setClassNames("");
          setMenuState("hide");
        }
      }
    };

    // Añadimos el listener solo si estamos en vista mobile
    if (mobileActive) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    // Removemos el listener
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileActive]);

  // Esperamos los datos de usuario
  if (!user) {
    return <SimpleLoader />;
  }

  // Una vez que tenemos los datos de usuario, mostramos pagina
  return (
    <>
      <div ref={containerDiv} className={`layout_container ${classNames}`}>
        <Topbar user={user} setMenuState={setMenuState} />

        <div ref={sidebarRef} className="layout_sidebar">
          <Sidebar />
        </div>

        <div className={"layout_main_container"}>
          {/* Mostramos boton atras menos en el inicio */}
          {router.pathname != "/" && (
            <div className="mb-3">
              <Button
                onClick={() => router.back()}
                label="Atras"
                className="p-button-sm p-button-secondary"
                icon="pi pi-arrow-left"
              />
            </div>
          )}

          <div className={"layout_main"}>{props.children}</div>
        </div>

        <div className="layout_mask"></div>
      </div>
    </>
  );
};

export default Layout;
