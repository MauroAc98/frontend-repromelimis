import CartMessage from "@/project/components/CartMessage";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import PageTemplateSolicitud from "@/project/components/Guias/Solicitudes/PageTemplateSolicitud";
import MovimientosColmenasMeliponarios from "@/project/components/Guias/MeliponarioAMeliponario/MovimientosColmena/MovimientosColmenasMeliponarios";
import MovimientosColmenasRescate from "@/project/components/Guias/Solicitudes/Rescate/MovimientosColmenasRescate";

export default function MovimientosColmenas() {
    const { datosSolicitud } = useSolicitudGuiaContext();

    /** Evaluamos que mostrar */
    const evalContent = () => {
        if (!datosSolicitud?.motivo_solicitud) {
            return <CartMessage
                titulo="ERROR"
                mensaje={"Debe seleccionar un motivo de la solicitud."}
                tituloBoton="Volver a datos iniciales"
                classIcon="pi pi-times"
                url="/guias-traslado/solicitudes/datos-iniciales"
                colorIcon="red"
            />
        } else if (datosSolicitud?.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO") {
            if (!datosSolicitud?.id_meliponario_origen && !datosSolicitud?.id_meliponario_destino) {
                return <CartMessage
                    titulo="ERROR"
                    mensaje={"Debe seleccionar un meliponario de origen y destino."}
                    tituloBoton="Volver a origen y destino"
                    classIcon="pi pi-times"
                    url="/guias-traslado/solicitudes/origen-destino"
                    colorIcon="red"
                />
            } else {
                return <MovimientosColmenasMeliponarios />
            }

        } else {
            return <MovimientosColmenasRescate />
        }
    }


    return (
        <PageTemplateSolicitud
            title="Movimientos de colmenas"
        >
            {evalContent()}
        </PageTemplateSolicitud>
    )
}