import { createContext, useContext, useEffect, useState } from "react";
import api from "@/base/helpers/api";
import { useRouter } from "next/router";
import DialogInitActualizacion from "../components/Tramites/DialogInitActualizacion";

const TramiteContext = createContext();

const TramiteContextProvider = ({ children }) => {
    const FORM_PAGES = [
        '/tramites',
        '/tramites/productores',
        '/tramites/meliponarios',
        '/tramites/meliponarios/colmenas',
        '/tramites/acred-capa',
        '/tramites/prod-comercializacion',
        '/tramites/extraccion-miel',
        '/tramites/act-compl'
    ];

    const router = useRouter();

    const [datosTramite, setDatosTramite] = useState(null);
    const [datosCapacitacion, setDatosCapacitacion] = useState(null);
    const [datosProdComercializacion, setDatosProdComercializacion] = useState(null);
    const [datosExtraccionMiel, setDatosExtraccionMiel] = useState(null);
    const [datosProductor, setDatosProductor] = useState(null);
    const [datosMeliponarios, setDatosMeliponarios] = useState([]);
    const [datosActividadesComplementarias, setDatosActividadesComplementarias] = useState([]);
    const [requestStatus, setRequestStatus] = useState('LOADING');
    const [dialogInitActualizacion, setDialogInitActualizacion] = useState({
        show: false,
        repromelimisData: {}
    });


    // Ejecuta endpoint y trae datos de tramite actual
    const getTramiteActual = async () => {
        try {
            setRequestStatus('LOADING');

            const { data } = await api.get("/tramites/get-tramite-actual");

            // Verifico si no tengo un tramite actual
            if (!data.tramite_actual) {
                setRequestStatus('ERROR');
                return;
            }

            // Si esta todo OK
            const { tramite_actual } = data;
            // Extraer las propiedades que no son 'foto_certificacion' ni 'tipo_capacitacion'
            const { foto_certificacion, tipo_capacitacion, ..._datosTramite } = tramite_actual;

            // Seteamos datos en estados
            setDatosTramite(tramite_actual);
            setDatosCapacitacion({
                tipo_capacitacion: tramite_actual.tipo_capacitacion,
                foto_certificacion: tramite_actual.foto_certificacion,
            });
            setDatosExtraccionMiel(tramite_actual.extraccion_miel);
            setDatosProdComercializacion(tramite_actual.producto_comercializacion);
            setDatosProductor(tramite_actual.productor);
            setDatosActividadesComplementarias(tramite_actual.actividades_complementarias);
            setDatosMeliponarios(tramite_actual.meliponarios);
            setRequestStatus('SUCCESS');

        } catch (error) {
            setRequestStatus('ERROR');
        }
    }

    /** Muestra dialogo cuando creamos tramite de actualización */
    const showDialogInitActualizacion = (repromelimisData) => {
        setDialogInitActualizacion({
            show: true,
            repromelimisData: repromelimisData
        })
    }

    useEffect(() => {
        // Si cambio de ruta y es una de FORM_PAGES, traigo los datos del tramite actual para mantener actualizado
        if (FORM_PAGES.includes(router.pathname)) {
            getTramiteActual();
        }
    }, [router.pathname])

    const data = {
        requestStatus,
        datosTramite,
        setDatosTramite,
        datosCapacitacion,
        setDatosCapacitacion,
        datosProductor,
        setDatosProductor,
        datosMeliponarios,
        setDatosMeliponarios,
        getTramiteActual,
        datosProdComercializacion,
        datosActividadesComplementarias,
        setDatosActividadesComplementarias,
        datosExtraccionMiel,
        showDialogInitActualizacion
    };

    return (
        <TramiteContext.Provider value={data}>
            <DialogInitActualizacion
                dialogInitActualizacion={dialogInitActualizacion}
                setDialogInitActualizacion={setDialogInitActualizacion}
            />
            {children}
        </TramiteContext.Provider>
    );
};

export { TramiteContextProvider };

export const useTramiteContext = () => useContext(TramiteContext);
