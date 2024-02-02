import CustomTable from "@/base/components/Table/CustomTable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { formatDate } from "@/base/helpers/utils";

export default function DialogMovimientos(props) {

    const motivoTemplate = (rowData) => {
        if (rowData.motivo == "CREACION") {
            return <Tag value="CREACION" severity="success" />;
        } else if (rowData.motivo == "PERDIDA") {
            return <Tag value="PERDIDA" severity="danger" />;
        } else if (rowData.motivo == "TRASLADO_GUIA") {
            return <Tag value="TRASLADO GUIA" severity="primary" />;
        }
    };

    const columns = [
        {
            field: "motivo",
            header: "Motivo",
            body: motivoTemplate,
            align: "center"
        },
        {
            field: "cantidad",
            header: "Cantidad",
            align: "center"
        },
        {
            field: "fecha_movimiento",
            header: "Fecha movimiento",
            body: (rowData) => formatDate("dd/mm/yyyy", rowData.fecha_movimiento),
            align: "center"
        },
        {
            field: "observacion",
            header: "Observación",
            align: "center"
        }
    ];



    return (

        <Dialog
            header={`${props.title ?? ""}`}
            visible={props.show}
            onHide={props.onHide}
            style={{ width: "60vw" }}
            position="center"
            draggable={false}>

            <CustomTable
                hidePaginator={true}
                columns={columns}
                data={props.data}
            />
        </Dialog>
    );
}
