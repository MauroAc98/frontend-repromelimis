import FloatInput from "@/base/components/Form/FloatInput";
import useCustomForm from "@/base/hooks/useCustomForm";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import api, { MEDIA_HEADERS, getResponseError } from "@/base/helpers/api";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useToastContext } from "@/base/context/ToastContext";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { TabView, TabPanel } from "primereact/tabview";
import FormDireccion from "@/base/components/Direccion/FormDireccion";
import Media from "@/base/components/Media/Media";
import { checkFormData, formatMultipartFormData } from "@/base/helpers/utils";
import { useRouter } from "next/router";
import MeliponicultorResponsable from "./MeliponicultorReponsableSection/MeliponicultorResponsable";
import UserEmail from "./UserEmail";
import InsDatosProductor from "./Tabs/InsDatosProductor";
import Direccion from "./Tabs/Direccion";
import ActDatosProductor from "./Tabs/ActDatosProductor";

export default function FormProductor(props) {
  const [activeTab, setActiveTab] = useState(0);
  const {
    formData,
    handleFormChange,
    formErrors,
    setFormData,
    handleSetFormErrors,
  } = useCustomForm();
  const { datosTramite, datosProductor } = useTramiteContext();

  const evalDatosProductor = () => {
    switch (datosTramite.tipo_tramite) {
      case "INSCRIPCION":
        return (
          <InsDatosProductor
            setActiveTab={setActiveTab}
            formData={formData}
            handleFormChange={handleFormChange}
            formErrors={formErrors}
            setFormData={setFormData}
            handleSetFormErrors={handleSetFormErrors}
            datosActualesProductor={datosProductor}
            datosTramite={datosTramite}
          />
        );

      case "ACTUALIZACION":
        return (
          <ActDatosProductor
            setActiveTab={setActiveTab}
            formData={formData}
            handleFormChange={handleFormChange}
            formErrors={formErrors}
            setFormData={setFormData}
            handleSetFormErrors={handleSetFormErrors}
            datosActualesProductor={datosProductor}
            datosTramite={datosTramite}
          />
        );
    }
  };

  useEffect(() => {
    setFormData(datosProductor);
  }, [datosProductor]);

  return (
    <>
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
      >
        <TabPanel header="Datos Productor">{evalDatosProductor()}</TabPanel>

        <TabPanel header="Direccion">
          <Direccion
            datosProductor={datosProductor}
            formData={formData}
            handleFormChange={handleFormChange}
            formErrors={formErrors}
            setFormData={setFormData}
            handleSetFormErrors={handleSetFormErrors}
            datosTramite={datosTramite}
          />
        </TabPanel>
      </TabView>
    </>
  );
}
