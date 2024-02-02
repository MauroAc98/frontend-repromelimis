import { useTramiteContext } from "@/project/context/TramiteContext";
import FormAcredCapa from "./FormAcredCapa";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function AcredCapaSection() {
  const router = useRouter();
  const { datosTramite } = useTramiteContext();

  if (datosTramite.tipo_tramite == "INSCRIPCION") {
    return <FormAcredCapa />;
  }

  return (
    <div className="grid">
      <div className="col-12">Este formulario solo es accesible desde un trámite de tipo inscripción.</div>
      <div className="mt-3 flex justify-content-end col-12">
        <Button
          className="p-button-sm"
          type="submit"
          label="Continuar"
          onClick={() => router.push("/tramites/meliponarios")}
        />
      </div>
    </div>
  );
}
