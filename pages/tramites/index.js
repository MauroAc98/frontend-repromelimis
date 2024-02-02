import PageTemplate from "@/base/components/BaseTemplate/PageTemplate";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import LazyTable from "@/base/components/Table/LazyTable";
import { formatDate, openUrl } from "@/base/helpers/utils";
import ButtonsTopTable from "@/project/components/Tramites/ButtonsTopTable";
import DialogVerHistorial from "@/project/components/Tramites/DialogVerHistorial";
import DialogPresentarTramite from "@/project/components/Tramites/PresentarTramite/DialogPresentarTramite";
import { useRouter } from "next/router";
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useState } from "react";

// Primer pagina de formulario para tramites
export const FIRST_PAGE_FORM = '/tramites/productores';

export default function Index() {
    const router = useRouter();
    const [refreshTable, setRefreshTable] = useState(0);
    const [dialogPresentarTramite, setDialogPresentarTramite] = useState({
        show: false,
        idTramite: null
    });
    const [dialogVerHistorial, setDialogVerHistorial] = useState({
        show: false,
        idTramite: null
    });

    const imprimirConstancia = (idTramite) => {
        const url = `${process.env.url_back}/tramites/constancia-tramite/${idTramite}`;
        openUrl(url, true);
    }

    const tipoTramiteTemplate = (rowData) => {
        if (rowData.tipo_tramite == "INSCRIPCION") {
            return <Tag value="INSCRIPCIÓN" />
        }
        return <Tag value="ACTUALIZACIÓN" />
    }

    const cuitTemplate = (rowData) => {
        return rowData?.productor?.cuit;
    }

    const estadoTemplate = (rowData) => {
        switch (rowData.estado_actual) {
            case 'EN_CARGA':
                return <Tag value="EN CARGA" />
            case 'EN_ESPERA_APROBACION':
                return <Tag value="EN ESPERA DE APROBACION" severity="info" />
            case 'APROBADO':
                return <Tag value="APROBADO" severity="success" />
            case 'RECHAZADO':
                return <Tag value="RECHAZADO" severity="danger" />
            case 'DATOS_INSUFICIENTES':
                return <Tag value="DATOS INSUFICIENTES" severity="warning" />
            case 'REQUIERE_CAPACITACION':
                return <Tag value="REQUIERE CAPACITACION" severity="warning" />
        }
    }

    const fechaSolicitudTemplate = (rowData) => {
        return formatDate("dd/mm/yyyy", rowData.fecha_hora_solicitud);
    }

    const actionButtons = (rowData) => {
        switch (rowData.estado_actual) {
            case "EN_CARGA":
                return (
                    <ActionButtonsTable
                        handleClickEdit={() => router.push(FIRST_PAGE_FORM)}
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Presentar"
                                    icon="pi pi-check"
                                    className="p-button-sm p-button-success"
                                    onClick={() => setDialogPresentarTramite({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                            </>
                        )}
                    />
                )
            case "EN_ESPERA_APROBACION":
                return (
                    <ActionButtonsTable
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Ver historial"
                                    icon="pi pi-eye"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => setDialogVerHistorial({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                            </>
                        )}
                    />
                )
            case "DATOS_INSUFICIENTES":
                return (
                    <ActionButtonsTable
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Ver historial"
                                    icon="pi pi-eye"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => setDialogVerHistorial({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                            </>
                        )}
                    />
                )
            case "APROBADO":
                return (
                    <ActionButtonsTable
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Ver historial"
                                    icon="pi pi-eye"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => setDialogVerHistorial({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                                <Button
                                    tooltip="Imprimir constancia de trámite"
                                    icon="pi pi-print"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => imprimirConstancia(rowData.id)}
                                />
                            </>
                        )}
                    />
                )
            case "RECHAZADO":
                return (
                    <ActionButtonsTable
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Ver historial"
                                    icon="pi pi-eye"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => setDialogVerHistorial({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                                <Button
                                    tooltip="Imprimir constancia de trámite"
                                    icon="pi pi-print"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => imprimirConstancia(rowData.id)}
                                />
                            </>
                        )}
                    />
                )

            case "REQUIERE_CAPACITACION":
                return (
                    <ActionButtonsTable
                        moreButtons={(
                            <>
                                <Button
                                    tooltip="Ver historial"
                                    icon="pi pi-eye"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => setDialogVerHistorial({
                                        show: true,
                                        idTramite: rowData.id
                                    })}
                                />
                                <Button
                                    tooltip="Imprimir constancia de trámite"
                                    icon="pi pi-print"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => imprimirConstancia(rowData.id)}
                                />
                            </>
                        )}
                    />
                )
        }

    }


    const columns = [
        {
            field: "fecha_solicitud",
            header: "Fecha solicitud",
            align: "center",
            body: fechaSolicitudTemplate,
        },
        {
            field: "nro",
            header: "Nro de trámite",
            align: 'center'
        },
        {
            field: "tipo_tramite",
            header: "Tipo trámite",
            align: "center",
            body: tipoTramiteTemplate,
        },
        {
            field: "cuit",
            header: "CUIT/CUIL",
            align: "center",
            body: cuitTemplate,
        },
        {
            field: "estado",
            header: "Estado",
            align: "center",
            body: estadoTemplate,
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: "center",
            body: actionButtons,
        }
    ];

    return (
        <>
            <DialogPresentarTramite
                idTramite={dialogPresentarTramite.idTramite}
                showDialog={dialogPresentarTramite.show}
                onHideDialog={() => setDialogPresentarTramite({ ...dialogPresentarTramite, show: false })}
                setRefreshTable={setRefreshTable}
            />
            <DialogVerHistorial
                showDialog={dialogVerHistorial.show}
                idTramite={dialogVerHistorial.idTramite}
                onHideDialog={() => setDialogVerHistorial({ ...dialogVerHistorial, show: false })}
            />
            <PageTemplate>
                <LazyTable
                    title={'Mis tramites'}
                    refreshTable={refreshTable}
                    columns={columns}
                    url={"tramites/get-all-tramites"}
                    pageSize={5}
                    buttonsSection={<ButtonsTopTable refreshTable={refreshTable} />}
                />
            </PageTemplate>
        </>
    )
}