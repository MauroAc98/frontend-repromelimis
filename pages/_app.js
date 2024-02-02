import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import "primeflex/primeflex.css";
import '@/base/styles/globals.css'
import '@/base/styles/layout.css'
import '@/project/styles/custom.css'
import { useRouter } from "next/router";
import { PUBLIC_ROUTES } from "@/project/helpers/publicRoutes";
import PrivateRoutes from "@/base/components/PrivateRoutes";
import PublicRoutes from "@/base/components/PublicRoutes";
import Head from 'next/head'
import { spanishLanguage } from "@/base/helpers/language";

export default function App({ Component, pageProps }) {
  spanishLanguage();
  const router = useRouter();

  // Si es una pagina de error
  if (router.pathname === "/404") {
    return (
      <>
        <Head>
          <title>{process.env.project_title_head}</title>
          <link rel="icon" href={process.env.icon} />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  // Public Routes
  if (PUBLIC_ROUTES.some((route) => route.url === router.pathname)) {
    // Encuentra el elemento correspondiente a la ruta actual en el array
    const currentRoute = PUBLIC_ROUTES.find((route) => route.url === router.pathname);

    // Obtén el valor de la prop redirectLogin para esa ruta
    const redirectLogin = currentRoute?.redirectLogin || false;

    return (
      <PublicRoutes redirectLogin={redirectLogin}>
        <Component {...pageProps} />
      </PublicRoutes>
    );
  }

  // Private Routes
  return (
    <PrivateRoutes>
      <Component {...pageProps} />
    </PrivateRoutes>
  )


}
