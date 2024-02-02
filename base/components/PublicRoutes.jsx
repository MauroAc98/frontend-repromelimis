import { useRouter } from "next/router";
import { UserProvider } from "@/base/context/userContext";
import { useEffect, useState } from "react";
import { getToken } from "@/base/helpers/api";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import { ToastContextProvider } from "@/base/context/ToastContext";
import { GeneralContextProvider } from "@/base/context/GeneralContext";
import Head from "next/head";

export default function PublicRoutes({ children, redirectLogin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token && redirectLogin) {
      // Si tenemos un token, redirigmos al dashboard
      router.push("/");
    } else {
      // Sino quitamos el loader y mostramos la pagina
      setLoading(false);
    }
  });

  if (loading) {
    return <SimpleLoader />;
  }

  return (
    <GeneralContextProvider>
      <ToastContextProvider>
        <UserProvider>
          <Head>
            <title>{process.env.project_title_head}</title>
            <link rel="icon" href={process.env.icon} />
          </Head>
          {children}
        </UserProvider>
      </ToastContextProvider>
    </GeneralContextProvider>
  );
}
