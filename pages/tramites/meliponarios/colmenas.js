import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite"
import { useEffect, useState } from "react"
import api, { getResponseError } from "@/base/helpers/api";
import { useRouter } from "next/router";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import CartMessage from "@/project/components/CartMessage";
import { Button } from 'primereact/button';
import CustomTable from "@/base/components/Table/CustomTable";
import DialogColmenas from "@/project/components/Meliponarios/Colmenas/DialogColmenas";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import { Tag } from "primereact/tag";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import { useToastContext } from "@/base/context/ToastContext";
import useGenericDelete from "@/base/hooks/useGenericDelete";

export default function Colmenas() {
    const router = useRouter();
    const [meliponarioData, setMeliponarioData] = useState({
        requestStatus: 'LOADING',
        data: {}
    });
    const { showErrorMsg } = useToastContext();
    const [showForm, setShowForm] = useState(false);
    const [submitAction, setSubmitAction] = useState(false);
    const [editData, setEditData] = useState(null);
    const [colmenasData, setColmenasData] = useState({
        requestStatus: 'LOADING',
        data: []
    })
    const { genericDelete } = useGenericDelete();

    /** DELETE */
    function onSucessDelete() {
        getColmenas();
    }

    const handleClickDelete = (rowData) => {
        genericDelete(`/colmenas/destroy-tmp/${rowData.id}`, null, onSucessDelete);
    };
    /** END DELETE */


    const getColmenas = async () => {
        try {
            setColmenasData({
                requestStatus: 'LOADING',
                data: []
            });

            const { data } = await api.get("/colmenas/get-by-meliponario", {
                params: {
                    id_meliponario: router.query?.id_meliponario
                }
            });
            setColmenasData({
                requestStatus: 'SUCCESS',
                data: data
            });
        } catch (error) {
            showErrorMsg(getResponseError(error));
        }
    }

    const getInitialData = async () => {
        try {
            setMeliponarioData({
                requestStatus: 'LOADING',
                data: {}
            });

            const { data } = await api.get(`/meliponarios/find/${router.query?.id_meliponario}`);
            setMeliponarioData({
                requestStatus: 'SUCCESS',
                data: data
            });

            // Una vez que traigo datos de meliponario, traigo colmenas 
            getColmenas();
        } catch (error) {
            setMeliponarioData({
                requestStatus: 'ERROR',
                data: {}
            })
        }
    }

    const handleClickEdit = (rowData) => {
        setEditData(rowData);
        setShowForm(true);
        setSubmitAction('edit');
    }

    const actionButtons = (rowData) => {
        return (
            <ActionButtonsTable
                handleClickDelete={rowData.id_registro_actual ? undefined : () => handleClickDelete(rowData)}
                handleClickEdit={() => handleClickEdit(rowData)}
            />
        )
    }

    const handleClickNuevo = () => {
        setEditData(null);
        setShowForm(true);
        setSubmitAction('add');
    }

    const especieTemplate = (rowData) => {
        if (rowData.id_especie) {
            return `${rowData.especie.nombre} - ${rowData.especie.nombre_comun}`;
        }
        return `${rowData.descripcion_especie} - ${rowData.descripcion_nombre_comun}`;
    }

    const estadoTemplate = (rowData) => {
        if (rowData.estado == "ACTIVO") {
            return <Tag severity="success" value={rowData.estado} />
        }
        return <Tag severity="danger" value={rowData.estado} />
    }

    const tipoColmenaTemplate = (rowData) => {
        switch (rowData.tipo_colmena) {
            case "TECNIFICADA":
                return <Tag value="Tecnificada" />
            case "RUSTICA":
                return <Tag value="Rústica" />
            case "NATURAL":
                return <Tag value="Natural (sección tronco u otro)" />
            case "TRAMPA_POBLADA":
                return <Tag value="Trampa poblada" />
        }

    }

    const columns = [
        {
            field: "nro",
            header: "N°"
        },
        {
            field: "especie",
            header: "Especie - Nombre Comun",
            body: especieTemplate
        },
        {
            field: "descripcion",
            header: "Descripcion",
        },
        {
            field: "tipo_colmena",
            header: "Tipo de colmena",
            body: tipoColmenaTemplate,
            align: "center"
        },
        {
            field: "cantidad_actual",
            header: "Cantidad actual",
            align: "center"
        },
        {
            field: "estado",
            header: "Estado",
            body: estadoTemplate,
            align: "center"
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: 'center',
            body: actionButtons
        }
    ];

    useEffect(() => {
        if (router.isReady) {
            getInitialData();
        }
    }, []);


    if (meliponarioData.requestStatus == "LOADING") {
        return <SimpleLoader />
    }

    if (meliponarioData.requestStatus == "ERROR") {
        return <CartMessage
            titulo="ERROR"
            mensaje={"No se pudo recuperar los datos de las colmenas"}
            tituloBoton="Volver a meliponarios"
            classIcon="pi pi-times"
            url="/tramites/meliponarios"
            colorIcon="red"
        />
    }

    return (
        <>
            <DialogColmenas
                showDialog={showForm}
                setShowDialog={setShowForm}
                submitAction={submitAction}
                idMeliponarioTmp={meliponarioData.data?.id}
                getColmenas={getColmenas}
                editData={editData}
            />
            <PageTemplateTramite title={`Colmenas de Meliponario N° ${meliponarioData?.data.nro}`}>
                <CustomTable
                    hidePaginator={true}
                    columns={columns}
                    data={colmenasData.data}
                    loading={colmenasData.requestStatus == "LOADING"}
                    buttonsSection={<ButtonsSection handleClickAdd={handleClickNuevo} />}
                />
                <div className="mt-7 text-sm">
                    <i>DECLARO BAJO JURAMENTO que la/las colmenas del/los meliponarios no son productos del tráfico de flora o fauna, y no proviene de: 1) áreas naturales protegidas, como ser parques nacionales, parques provinciales y reservas naturales; 2) bosques nativos en propiedad privada, tales como reservas privadas de usos múltiples y las propiedades privadas que forman parte de la Biosfera Yabotí; 3) bosques protectores de los ríos principales y el perímetro del Lago Urugua-í en un ancho de doscientos metros (200 m); 4) bosques protectores del suelo con pendientes iguales o mayores al quince por ciento (15 %) medidos en tramos de cien metros (100 m), en el sentido de la línea de máxima pendiente; 5) bosques protectores de cursos de agua, en un ancho sobre cada margen igual al triple del ancho de los mismos, sin que cada franja pueda ser inferior a diez metros (10 m); 6) fajas ecológicas y áreas de interés especial, incluso privadas que por su valor biológico, turístico y cultural deben ser conservadas y que se determinen por el Poder Ejecutivo; 7) espacios públicos, como ser veredas, espacios verdes, reservas fiscales, plazas y parques municipales (art. 5 ley VIII –</i>
                </div>
                <div className='mt-3 flex justify-content-end'>
                    <Button className="p-button-sm" label="Volver a meliponarios" onClick={() => router.push("/tramites/meliponarios")} />
                </div>
            </PageTemplateTramite>
        </>
    )
}