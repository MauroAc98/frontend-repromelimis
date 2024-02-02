import { createContext, useContext, useEffect, useState } from "react";
import api from "@/base/helpers/api";
import { useRouter } from "next/router";

const SolicitudGuiaContext = createContext();

const SolicitudGuiaContextProvider = ({ children }) => {
    const FORM_PAGES = [
        '/guias-traslado/solicitudes',
        '/guias-traslado/solicitudes/datos-iniciales',
        '/guias-traslado/solicitudes/origen-destino',
        '/guias-traslado/solicitudes/movimientos-colmenas'
    ];

    const router = useRouter();

    const [datosSolicitud, setDatosSolicitud] = useState(null);
    const [datosMeliponarios, setDatosMeliponarios] = useState(null);
    const [datosMovimientos, setDatosMovimientos] = useState(null);
    const [requestStatus, setRequestStatus] = useState('LOADING');


    // Ejecuta endpoint y trae datos de tramite actual
    const getSolicitudActual = async () => {
        try {
            setRequestStatus('LOADING');

            const { data } = await api.get("/solicitudes-guias/get-solicitud-actual");

            // Verifico si no tengo una solicitud actual
            if (!data.solicitud_actual) {
                setRequestStatus('ERROR');
                return;
            }

            // Si esta todo OK
            const { solicitud_actual } = data;
            const { meliponario_origen, meliponario_destino, ..._datosTramite } = solicitud_actual;

            setDatosMeliponarios({
                meliponario_origen: meliponario_origen,
                meliponario_destino: meliponario_destino
            })
            setDatosMovimientos(solicitud_actual.movimientos);

            // Seteamos datos en estados
            setDatosSolicitud(solicitud_actual);
            setDatosMovimientos(solicitud_actual.movimientos)
            setRequestStatus('SUCCESS');

        } catch (error) {
            setRequestStatus('ERROR');
        }
    }

    useEffect(() => {
        // Si cambio de ruta y es una de FORM_PAGES, traigo los datos del tramite actual para mantener actualizado
        if (FORM_PAGES.includes(router.pathname)) {
            getSolicitudActual();
        }
    }, [router.pathname])

    const data = {
        requestStatus,
        datosSolicitud,
        getSolicitudActual,
        datosMovimientos,
        setDatosMovimientos,
        datosMeliponarios,
    };

    return (
        <SolicitudGuiaContext.Provider value={data}>
            {children}
        </SolicitudGuiaContext.Provider>
    );
};

export { SolicitudGuiaContextProvider };

export const useSolicitudGuiaContext = () => useContext(SolicitudGuiaContext);
