import { UserProvider } from "@/base/context/userContext";
import CheckRoute from "@/base/components/CheckRoute";
import { ToastContextProvider } from "@/base/context/ToastContext";
import { GeneralContextProvider } from "@/base/context/GeneralContext";
import Head from "next/head";
import { TramiteContextProvider } from "@/project/context/TramiteContext";
import { SolicitudGuiaContextProvider } from "@/project/context/SolicitudGuiaContext";

export default function PrivateRoutes({ children }) {
  return (
    <GeneralContextProvider>
      <ToastContextProvider>
        <UserProvider>
          <TramiteContextProvider>
            <SolicitudGuiaContextProvider>
              <Head>
                <title>{process.env.project_title_head}</title>
                <link rel="icon" href={process.env.icon} />
              </Head>
              <CheckRoute>{children}</CheckRoute>
            </SolicitudGuiaContextProvider>
          </TramiteContextProvider>
        </UserProvider>
      </ToastContextProvider>
    </GeneralContextProvider>
  );
}
