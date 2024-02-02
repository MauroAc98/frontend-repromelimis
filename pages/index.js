import { useUserContext } from "@/base/context/userContext"
import { Button } from 'primereact/button';
import { formatDate, openUrl } from "@/base/helpers/utils";

export default function Home() {
  const { user } = useUserContext();

  const handlePrint = () => {
    const url = `${process.env.url_back}/repromelimis/constancia/${user?.productor?.repromelimis?.id}`;
    openUrl(url, true);
  }

  const evalRegistro = () => {
    if (user?.productor?.repromelimis.vencido) {
      return (
        <>
          <div>
            <i className="pi pi-times-circle mr-2 text-red-600 font-bold text-xl"></i>
            <span className="font-bold text-red-600">Su registro se encuentra vencido.</span>
          </div>
          <div className="mt-2">
            <i className="pi pi-calendar mr-2 font-bold text-xl" ></i>
            <span className="font-bold">Constancia válida hasta: {formatDate("dd/mm/yyyy", user?.productor?.repromelimis.fecha_vencimiento)}</span>
          </div>
        </>
      )
    }

    return (
      <>
        <div>
          <i className="pi pi-check-circle mr-2 text-green-600 font-bold text-xl" ></i>
          <span className="font-bold text-green-600">Su registro se encuentra vigente.</span>
        </div>
        <div className="mt-2">
          <i className="pi pi-calendar mr-2 font-bold text-xl" ></i>
          <span className="font-bold">Constancia válida hasta: {formatDate("dd/mm/yyyy", user?.productor?.repromelimis.fecha_vencimiento)}</span>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="card">
        {/* Si posee un registro de repromelimis */}
        {user?.productor?.repromelimis ? (
          <div>
            {evalRegistro()}

            {!user?.productor?.repromelimis.vencido && (
              <Button
                onClick={handlePrint}
                label="Imprimir Constancia de ReProMeliMis"
                className="p-button-secondary p-button-outlined p-button-sm mt-3"
                icon="pi pi-print"
              />
            )}

          </div>
        ) : (
          <div>
            <i className="pi pi-info-circle mr-2 font-bold text-xl text-yellow-600"></i>
            <span className="font-bold ">No se encuentra inscripto en el registro de ReProMeliMis, dirijase a la sección de Trámites.</span>
          </div>
        )}
      </div>
    </>
  )
}
