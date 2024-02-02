import Layout from "@/base/components/BaseTemplate/Layout";
import { useUserContext } from "@/base/context/userContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { routesPermissions } from "@/project/helpers/permissions/_routesPermissions";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import UnauthorizedPage from "@/base/components/UnauthorizedPage/UnauthorizedPage";

export default function CheckRoute({ children }) {
  const { user } = useUserContext();

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(false);
  const [evalRoute, setEvalRoute] = useState(false);

  useEffect(() => {
    // Una vez obtenidos los datos del context comparamos
    // Chequeamos si existe usuario ya que en logout se limpia los datos
    if (evalRoute && user) {
      // Si es usuario root, tiene acceso a todo y no hace falta chequear
      if (user.root) {
        setLoading(false);
        setAction("AUTHORIZED");
      } else {
        /** -----------CHEQUEO DE RUTA CON PERMISOS------- */
        // Obtenemos path actual
        const actual_path = router.pathname;

        // Verificamos que la ruta no sea una de estas que todos pueden ingresar sin importar el permiso
        if (["/"].includes(actual_path)) {
          setLoading(false);
          setAction("AUTHORIZED");
          return;
        }

        const pathname_auth = routesPermissions.find((item) => {
          /** Si tengo un asterisco en mi pathname,
           * quiere decir que solo tengo que evaluar el principio del string, sin importar lo que venga despues
           * ------
           * Ej: /pagina1 /pagina1/add /pagina1/edit - son validas para el pathname /pagina1*
           * ------
           * */
          if (item.pathname.includes("*")) {
            // Quito el asterisco
            const sin_asterisco = item.pathname.replace(/\*/g, "");
            // Si mi  ruta actual comienza con este pathname, sin importar lo que venga despues, retorno el item
            if (actual_path.startsWith(sin_asterisco)) {
              return item;
            }
          } else if (item.pathname == actual_path) {
            /** Sino tengo asterisco, evalua el pathname asi tal cual */
            return item;
          }
        });

        // Si no encuentra el pathname es porque no esta definido en routes permissions y deberia añadirlo
        if (pathname_auth == undefined) {
          setLoading(false);
          setAction("UNAUTHORIZED");
          return;
        }

        // Verificamos si el usuario tiene el permiso
        const havePermission = user.permissions.find(
          (element) => element == pathname_auth.permission
        );

        // Si no posee el permiso necesario, no mostramos la pagina
        if (havePermission == undefined) {
          setLoading(false);
          setAction("UNAUTHORIZED");
          return;
        }

        // Si tiene el permiso, mostramos la pagina
        setLoading(false);
        setAction("AUTHORIZED");
        /** --------END CHEQUEO DE RUTA------------ */
      }
    }
  });

  /** Esperamos a obtener los datos de usuario del context para checkear ruta */
  useEffect(() => {
    if (user) {
      setEvalRoute(true);
    }
  }, [user]);

  if (loading) {
    return <SimpleLoader />;
  }

  if (!loading && action === "UNAUTHORIZED") {
    return <UnauthorizedPage />;
  }

  return <Layout>{children}</Layout>;
}
