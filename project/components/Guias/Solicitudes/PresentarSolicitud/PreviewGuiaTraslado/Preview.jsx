import { Accordion, AccordionTab } from "primereact/accordion";
import DatosIniciales from "./items/DatosIniciales";
import DatosOrigenYDestino from "./items/DatosOrigenYDestino";
import DatosMovimientosColmenas from "./items/DatosMovimientosColmenas";


const Preview = ({ data }) => {

  return (
    <>
      <Accordion className="mt-3 mb-5" multiple activeIndex={[0]}>
        <AccordionTab header="Datos iniciales">
          <DatosIniciales data={data} />
        </AccordionTab>

        <AccordionTab header="Origen y destino">
          <DatosOrigenYDestino data={data} />
        </AccordionTab>

        <AccordionTab header="Movimientos de colmenas">
          <DatosMovimientosColmenas data={data} />
        </AccordionTab>
      </Accordion>
    </>
  );
};

export default Preview;
