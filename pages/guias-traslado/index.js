import PageTemplate from "@/base/components/BaseTemplate/PageTemplate";
import LazyTable from "@/base/components/Table/LazyTable";
import { Tag } from "primereact/tag";
import { formatDate } from "@/base/helpers/utils";
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";
import DialogCerrarGuia from "@/project/components/Guias/Guias/DialogCerrarGuia/DialogCerrarGuia";
import { maskNroGuia } from "@/project/helpers/utils";
import FilterTable from "@/project/components/Guias/Guias/FilterTable";
import { useRouter } from "next/router";

export default function GuiasTraslado() {
    const router = useRouter();
    const [dialogCerrarGuia, setDialogCerrarGuia] = useState({
        show: false,
        idGuia: null
    });
    const [refreshTable, setRefreshTable] = useState(0);
    const [initialPageState, setInitialPageState] = useState({
        showPage: false,
        filters: {}
    });

    const actionButtons = (rowData) => {
        if (rowData.estado_actual == "PENDIENTE") {
            return (
                <Button
                    tooltip="Cerrar guia"
                    icon="pi pi-check"
                    className="p-button-sm p-button-outlined p-button-secondary"
                    onClick={() => setDialogCerrarGuia({
                        show: true,
                        idGuia: rowData.id
                    })}
                />
            )
        }

    }

    const estadoTemplate = (rowData) => {
        switch (rowData.estado_actual) {
            case 'PENDIENTE':
                return <Tag value="PENDIENTE" severity="warning" />
            case 'CERRADA':
                return <Tag value="CERRADA" severity="success" />
        }
    }

    const motivoTemplate = (rowData) => {
        switch (rowData.motivo_solicitud) {
            case 'MELIPONARIO_A_MELIPONARIO':
                return <Tag value="MELIPONARIO A MELIPONARIO" />
            case 'RESCATE_A_ESPACIO_PUBLICO':
                return <Tag value="RESCATE A ESPACIO PUBLICO" />
        }
    }

    const columns = [
        {
            field: "nro",
            header: "Nro de guia",
            align: 'center',
            body: (rowData) => maskNroGuia(rowData.nro)
        },
        {
            field: "fecha_vencimiento",
            header: "Fecha de vencimiento",
            align: 'center',
            body: (rowData) => formatDate("dd/mm/yyyy", rowData.fecha_vencimiento)
        },
        {
            field: "motivo_solicitud",
            header: "Motivo solicitud",
            align: "center",
            body: motivoTemplate
        },
        {
            field: "estado_actual",
            header: "Estado",
            align: "center",
            body: estadoTemplate
        },
        {
            field: "fecha_hora_cierre",
            header: "Fecha de cierre",
            align: 'center',
            body: (rowData) => rowData.fecha_hora_cierre ? formatDate("dd/mm/yyyy", rowData.fecha_hora_cierre) : ''
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: "center",
            body: actionButtons,
        }
    ];

    /** Seteo filtro inicial */
    useEffect(() => {
        if (router.isReady) {
            if (router.query.nro) {
                setInitialPageState({
                    showPage: true,
                    filters: {
                        nro: router.query.nro
                    }
                });
            } else {
                setInitialPageState({
                    showPage: true,
                    filters: {}
                });
            }
        }
    }, [router]);

    return (
        <>
            {initialPageState.showPage && (
                <>
                    <DialogCerrarGuia
                        showDialog={dialogCerrarGuia.show}
                        idGuia={dialogCerrarGuia.idGuia}
                        onHideDialog={() => setDialogCerrarGuia({ ...dialogCerrarGuia, show: false })}
                        setRefreshTable={setRefreshTable}
                    />
                    <PageTemplate>
                        <LazyTable
                            title={'Mis guias de traslado'}
                            columns={columns}
                            url={"guias/get-mis-guias"}
                            pageSize={5}
                            refreshTable={refreshTable}
                            filterTemplate={<FilterTable />}
                            initialFilters={initialPageState.filters}
                        />
                    </PageTemplate>
                </>
            )}

        </>
    )
}