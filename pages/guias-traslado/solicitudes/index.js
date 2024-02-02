import PageTemplate from "@/base/components/BaseTemplate/PageTemplate"
import LazyTable from "@/base/components/Table/LazyTable"
import ButtonsTopTable from "@/project/components/Guias/Solicitudes/ButtonsTopTable";
import { formatDate } from "@/base/helpers/utils";
// Primer pagina de formulario para solicitudes
export const FIRST_PAGE_FORM = '/guias-traslado/solicitudes/datos-iniciales';
import { Tag } from "primereact/tag";
import { useState } from "react";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import { useRouter } from "next/router";
import { Button } from 'primereact/button';
import DialogVerHistorial from "@/project/components/Guias/Solicitudes/DialogVerHistorial";
import DialogPresentarSolicitud from "@/project/components/Guias/Solicitudes/PresentarSolicitud/DialogPresentarSolicitud";

export const SITIOS_GUIAS = [
    {
        label:
            "Áreas naturales protegidas, como ser parques nacionales, parques provinciales y reservas naturales",
        value: "AREAS_PROTEGIDAS",
    },
    {
        label:
            "Bosques nativos en propiedad privada, tales como reservas privadas de usos múltiples y las propiedades privadas que formen parte de la Biosfera Yabotí",
        value: "BOSQUES_NATIVOS",
    },
    {
        label:
            "Bosques protectores de los ríos principales y el perímetro del Lago Urugua-í en un ancho de doscientos metros (200 m.)",
        value: "BOSQUES_PROTECTORES_RIOS",
    },
    {
        label:
            "Bosques protectores del suelo con pendientes iguales o mayores al quince por ciento (15 %) medidos en tramos de cien metros (100 m.), en el sentido de la línea de máxima pendiente",
        value: "BOSQUES_PROTECTORES_SUELO",
    },
    {
        label:
            "Bosques protectores de cursos de agua, en un ancho sobre cada margen igual al triple del ancho del mismo, no pudiendo cada franja ser inferior a diez metros (10 m.)",
        value: "BOSQUES_PROTECTORES_AGUA",
    },
    {
        label:
            "Fajas ecológicas y áreas de interés especial, incluso privadas que por su valor biológico, turístico y cultural deben ser conservadas y que se determinen por el Poder Ejecutivo",
        value: "FAJAS_ECOLOGICAS",
    },
    {
        label:
            "Espacios públicos, como ser veredas, espacios verdes, reservas fiscales, plazas y parques municipales.",
        value: "ESPACIOS_PUBLICOS",
    },
];

export default function SolicitudGuiasTraslado() {
    const router = useRouter();
    const [refreshTable, setRefreshTable] = useState(0);
    const [dialogVerHistorial, setDialogVerHistorial] = useState({
        show: false,
        idSolicitud: null
    });
    const [dialogPresentarSolicitud, setDialogPresentarSolicitud] = useState({
        show: false,
        idSolicitud: null
    });


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
        }
    }

    const actionButtons = (rowData) => {
        switch (rowData.estado_actual) {
            case "EN_CARGA":
                return (
                    <ActionButtonsTable
                        handleClickEdit={() => router.push(FIRST_PAGE_FORM)}
                        moreButtons={(
                            <>
                                {<Button
                                    tooltip="Presentar"
                                    icon="pi pi-check"
                                    className="p-button-sm p-button-success"
                                    onClick={() => setDialogPresentarSolicitud({
                                        show: true,
                                        idSolicitud: rowData.id
                                    })}
                                />}
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
                                        idSolicitud: rowData.id
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
                                        idSolicitud: rowData.id
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
                                        idSolicitud: rowData.id
                                    })}
                                />
                                <Button
                                    tooltip="Ver guía"
                                    icon="pi pi-arrow-right"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => router.push(`/guias-traslado?nro=${rowData.guia.nro}`)}
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
                                        idSolicitud: rowData.id
                                    })}
                                />
                                {/*
                                <Button
                                    tooltip="Imprimir constancia de trámite"
                                    icon="pi pi-print"
                                    className="p-button-sm p-button-outlined p-button-secondary"
                                    onClick={() => imprimirConstancia(rowData.id)}
                                /> */}
                            </>
                        )}
                    />
                )
        }

    }

    const motivoTemplate = (rowData) => {
        if (rowData.motivo_solicitud == "RESCATE_A_ESPACIO_PUBLICO") {
            return <Tag value="RESCATE A ESPACIO PUBLICO" />
        } else if (rowData.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO") {
            return <Tag value="MELIPONARIO A MELIPONARIO" />
        }
    }


    const columns = [
        {
            field: "fecha_solicitud",
            header: "Fecha solicitud",
            align: "center",
            body: (rowData) => formatDate("dd/mm/yyyy", rowData.fecha_hora_solicitud),
        },
        {
            field: "nro",
            header: "Nro de solicitud",
            align: 'center'
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
            <DialogPresentarSolicitud
                idSolicitud={dialogPresentarSolicitud.idSolicitud}
                showDialog={dialogPresentarSolicitud.show}
                onHideDialog={() => setDialogPresentarSolicitud({ ...dialogPresentarSolicitud, show: false })}
                setRefreshTable={setRefreshTable}
            />

            <DialogVerHistorial
                showDialog={dialogVerHistorial.show}
                idSolicitud={dialogVerHistorial.idSolicitud}
                onHideDialog={() => setDialogVerHistorial({ ...dialogVerHistorial, show: false })}
            />
            <PageTemplate>
                <LazyTable
                    title={'Mis solicitudes de guias de traslado'}
                    refreshTable={refreshTable}
                    columns={columns}
                    url={"solicitudes-guias/get-mis-solicitudes"}
                    pageSize={5}
                    buttonsSection={<ButtonsTopTable refreshTable={refreshTable} />}
                />
            </PageTemplate>
        </>
    )
}