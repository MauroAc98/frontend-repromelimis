import PageTemplateSolicitud from "@/project/components/Guias/Solicitudes/PageTemplateSolicitud";
import DatosInicialesSoli from "@/project/components/Guias/Solicitudes/DatosIniciales";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";

export default function DatosIniciales() {

    const { datosSolicitud } = useSolicitudGuiaContext();

    return (
        <PageTemplateSolicitud
            title="Datos iniciales"
        >
            <DatosInicialesSoli datosSolicitud={datosSolicitud}  />
        </PageTemplateSolicitud>
    )
}