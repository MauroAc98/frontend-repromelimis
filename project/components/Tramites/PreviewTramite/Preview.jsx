import { Accordion, AccordionTab } from "primereact/accordion";
import DatosTramite from "./Item/DatosTramite";
import DatosProductor from "./Item/DatosProductor";
import DatosAcreditacion from "./Item/DatosAcreditacion";
import DatosMeliponarios from "./Item/DatosMeliponarios";
import DatosProdComercializacion from "./Item/DatosProdComercializacion";
import DatosExtraccionMiel from "./Item/DatosExtraccionMiel";
import DatosActComplementarias from "./Item/DatosActComplementarias";

const Preview = ({ data }) => {

  return (
    <>
      <Accordion className="mt-3 mb-5" multiple activeIndex={[0]}>
        <AccordionTab header="Datos Trámite">
          <DatosTramite data={data} />
        </AccordionTab>
        {data.productor && (
          <AccordionTab header="Datos Productor">
            <DatosProductor
              data={data}
              tipoTramite={data.tipo_tramite}
              repromelimisActual={data.repromelimis_actual}
            />
          </AccordionTab>
        )}
        {data.tipo_tramite == "INSCRIPCION" && (
          <AccordionTab header="Acreditacion Capacitación">
            <DatosAcreditacion data={data} />
          </AccordionTab>
        )}
        {data.meliponarios.length > 0 && (
          <AccordionTab header="Meliponarios">
            <DatosMeliponarios data={data} />
          </AccordionTab>
        )}
        {data.producto_comercializacion.length > 0 && (
          <AccordionTab header="Productos y Comercialización">
            <DatosProdComercializacion data={data} />
          </AccordionTab>
        )}
        {data.extraccion_miel.length > 0 && (
          <AccordionTab header="Extracción de miel">
            <DatosExtraccionMiel data={data} />
          </AccordionTab>
        )}
        {data.actividades_complementarias.length > 0 && (
          <AccordionTab header="Actividades Complementarias">
            <DatosActComplementarias data={data} />
          </AccordionTab>
        )}
      </Accordion>
    </>
  );
};

export default Preview;
