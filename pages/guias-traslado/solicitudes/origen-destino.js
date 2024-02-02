import PageTemplateSolicitud from "@/project/components/Guias/Solicitudes/PageTemplateSolicitud"
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext"
import CartMessage from "@/project/components/CartMessage";
import OrigenDestinoMeliponarios from "@/project/components/Guias/MeliponarioAMeliponario/OrigenDestino/OrigenDestinoMeliponarios";
import FormRescateOrigenDestino from "@/project/components/Guias/Solicitudes/Rescate/FormRescateOrigenDestino";

export default function OrigenDestino() {
    const { datosSolicitud } = useSolicitudGuiaContext();

    /** Evaluamos que mostrar */
    const evalContent = () => {
        if (!datosSolicitud.motivo_solicitud) {
            return <CartMessage
                titulo="ERROR"
                mensaje={"Debe seleccionar un motivo de la solicitud."}
                tituloBoton="Volver a datos iniciales"
                classIcon="pi pi-times"
                url="/guias-traslado/solicitudes/datos-iniciales"
                colorIcon="red"
            />
        } else if (datosSolicitud.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO") {
            return <OrigenDestinoMeliponarios />
        } else {
            return <FormRescateOrigenDestino />
        }
    }

    return (
        <PageTemplateSolicitud
            title="Origen y destino"
        >
            {evalContent()}
        </PageTemplateSolicitud>
    )
}