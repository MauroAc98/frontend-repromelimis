/* eslint-disable react-hooks/rules-of-hooks */

import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useState } from "react";
import FormProductor from "@/project/components/Productor/FormProductor";

export default function productores() {

    const { datosProductor } = useTramiteContext();
    const [showForm, setShowForm] = useState(true);


    return (
        <>
            <PageTemplateTramite title={'Datos del Productor'}>
                <FormProductor onHideForm={setShowForm} datosProductor={datosProductor} />
            </PageTemplateTramite>
        </>
    )
}