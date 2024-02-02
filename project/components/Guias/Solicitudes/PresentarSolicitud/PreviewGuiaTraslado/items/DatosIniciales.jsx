import { maskNroRepromelimis } from "@/project/helpers/utils";
export default function DatosIniciales({ data }) {

    return (
        <>
            <div className={["mt-4", "div_data"].join(" ")}>

                <div className="grid">

                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">N° ReProMeliMis</div>
                        <div>
                            {maskNroRepromelimis(
                                data?.usuario_externo?.productor?.repromelimis?.id
                            )}
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">Tipo persona</div>
                        <div>
                            {
                                data?.usuario_externo?.productor?.persona_juridica ? "Jurídica" : "Física"
                            }
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">CUIT/CUIL</div>
                        <div>{data?.usuario_externo?.productor?.cuit}</div>
                    </div>

                    {data?.usuario_externo?.productor?.razon_social ?
                        <div className="col-12 lg:col-4">
                            <div className="font-bold mb-2">Empresa</div>
                            <div>{data?.usuario_externo?.productor?.razon_social}</div>
                        </div>
                        :
                        <>
                            <div className="col-12 lg:col-4">
                                <div className="font-bold mb-2">Apellido</div>
                                <div>{data?.usuario_externo?.productor?.apellido}</div>
                            </div>
                            <div className="col-12 lg:col-4">
                                <div className="font-bold mb-2">Nombres</div>
                                <div>{data?.usuario_externo?.productor?.nombres}</div>
                            </div>
                        </>
                    }

                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">Motivo solicitud</div>
                        <div>{data?.motivo_solicitud}</div>
                    </div>
                </div>

            </div>
        </>
    );
}
