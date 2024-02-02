import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { formatTimestamp } from "@/base/helpers/utils";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import DialogDireccion from "@/base/components/Direccion/DialogDireccion";
import { Image } from "primereact/image";
import { formatDate } from "@/base/helpers/utils";
import { maskNroRepromelimis } from "@/project/helpers/utils";

const DatosProductor = ({
  data: { productor },
  tipoTramite,
  repromelimisActual,
}) => {
  const [dialogDireccion, setDialogDireccion] = useState({
    show: false,
    title: "",
    direccionData: null,
  });

  const evalRegistro = () => {
    if (productor.productor_responsable?.repromelimis?.vencido) {
      return (
        <div>
          <i className="pi pi-times-circle mr-2 text-red-600 font-bold text-xl"></i>
          <span className="font-bold text-red-600">Registro vencido</span>
        </div>
      );
    }

    return (
      <div>
        <i className="pi pi-check-circle mr-2 text-green-500 font-bold text-xl"></i>
        <span className="font-bold text-green-500">Registro vigente</span>
      </div>
    );
  };

  // Evalua si mostrar input
  const evalShowInput = (input) => {
    if (
      tipoTramite === "INSCRIPCION" ||
      (tipoTramite === "ACTUALIZACION" && productor.persona_juridica)
    ) {
      return input;
    }
    return <></>;
  };

  // Evalua si mostrar datos de tramite, o de registro ReProMelimis
  const evalShowData = (data, label) => {
    if (
      tipoTramite === "INSCRIPCION" ||
      (tipoTramite === "ACTUALIZACION" && productor.persona_juridica)
    ) {
      return (
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText value={productor[data]} readOnly />
            <label>{label}</label>
          </span>
        </div>
      );
    } else {
      return (
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText value={repromelimisActual.productor[data]} readOnly />
            <label>{label}</label>
          </span>
        </div>
      );
    }
  };

  return (
    <>
      {dialogDireccion.show && (
        <DialogDireccion
          show={dialogDireccion.show}
          data={dialogDireccion.direccionData}
          title={dialogDireccion.title}
          onHide={() => setDialogDireccion({ ...dialogDireccion, show: false })}
        />
      )}
      <Fieldset
        legend={
          productor?.persona_juridica ? "Representante legal" : "Productor"
        }
      >
        <div className="grid p-3">
          {tipoTramite == "INSCRIPCION" && (
            <div className="field col-12 md:col-4">
              <span className="p-float-label">
                <InputText
                  id="fecha_inicio_actividad"
                  value={formatTimestamp(
                    productor?.fecha_inicio_actividad,
                    "dd/mm/yyyy"
                  )}
                  readOnly
                />
                <label htmlFor="fecha_inicio_actividad">
                  Fecha inicio de actividad
                </label>
              </span>
            </div>
          )}

          {evalShowData("apellido", "Apellido")}

          {evalShowData("nombres", "Nombres")}

          {evalShowData("cuit", "CUIT/CUIL")}

          {evalShowData("tipo_doc", "Tipo doc")}

          {evalShowData("documento", "Documento")}

          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <InputText id="email" value={productor?.email} readOnly />
              <label htmlFor="email">Email</label>
            </span>
          </div>

          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <InputText id="telefono" value={productor?.telefono} readOnly />
              <label htmlFor="telefono">Teléfono</label>
            </span>
          </div>

          <div className="field col-12">
            {productor?.persona_juridica ? (
              <>
                {productor?.direccion_representante && (
                  <Button
                    label={"Dirección Representante"}
                    tooltip="Ver"
                    icon="pi pi-map-marker"
                    className="p-button-outlined p-button-info mr-3"
                    onClick={() =>
                      setDialogDireccion({
                        show: true,
                        direccionData: productor?.direccion_representante,
                        title: "Representante Legal",
                      })
                    }
                  />
                )}
              </>
            ) : (
              <>
                {productor?.direccion_real && (
                  <Button
                    label={"Direccion Real"}
                    tooltip="Ver"
                    icon="pi pi-map-marker"
                    className="p-button-outlined p-button-info mr-3"
                    onClick={() =>
                      setDialogDireccion({
                        show: true,
                        direccionData: productor?.direccion_real,
                        title: "Real",
                      })
                    }
                  />
                )}

                {productor?.direccion_legal && (
                  <Button
                    label={"Dirección Legal"}
                    tooltip="Ver"
                    icon="pi pi-map-marker"
                    className="p-button-outlined p-button-info mr-3"
                    onClick={() =>
                      setDialogDireccion({
                        show: true,
                        direccionData: productor?.direccion_legal,
                        title: "Legal",
                      })
                    }
                  />
                )}
              </>
            )}
          </div>
          <div className="field col-12 flex flex-column md:flex-row">
            {evalShowInput(
              <div className="mr-5">
                <p className="mb-2 ml-2 text-sm">Foto documento adelante</p>
                <Image
                  src={productor?.foto_doc_adelante?.original_url}
                  width="200"
                  alt="Image"
                  preview
                />
              </div>
            )}
            {evalShowInput(
              <div className="mr-5">
                <p className="mb-2 ml-2 text-sm">Foto documento atras</p>
                <Image
                  src={productor?.foto_doc_atras?.original_url}
                  width="200"
                  alt="Image"
                  preview
                />
              </div>
            )}

            {productor?.persona_juridica && (
              <div className="md:mt-0 sm:mt-3">
                <p className="mb-2 ml-2 text-sm ">Foto constancia</p>
                <Image
                  className=""
                  src={productor?.foto_constancia?.original_url}
                  width="200"
                  alt="Image"
                  preview
                />
              </div>
            )}
          </div>
        </div>
      </Fieldset>
      {productor?.persona_juridica && (
        <>
          <Fieldset className="mt-3" legend="Empresa">
            <div className="grid p-3">
              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputText
                    id="razon_social"
                    value={productor?.razon_social}
                    readOnly
                  />
                  <label htmlFor="razon_social">Razón social</label>
                </span>
              </div>

              {evalShowData("cuit", "CUIT")}

              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputText
                    id="email_empresa"
                    value={productor?.email_empresa}
                    readOnly
                  />
                  <label htmlFor="email_empresa">Email</label>
                </span>
              </div>
              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputText
                    id="telefono_empresa"
                    value={productor?.telefono_empresa}
                    readOnly
                  />
                  <label htmlFor="telefono_empresa">Teléfono</label>
                </span>
              </div>

              {productor?.direccion_empresa && (
                <div className="field col-12">
                  <Button
                    label="Dirección Empresa"
                    tooltip="Ver"
                    icon="pi pi-map-marker"
                    className="p-button-outlined p-button-info"
                    onClick={() =>
                      setDialogDireccion({
                        show: true,
                        direccionData: productor?.direccion_empresa,
                        title: "Empresa",
                      })
                    }
                  />
                </div>
              )}
            </div>
          </Fieldset>

          <Fieldset className="mt-3" legend="Meliponicultor responsable">
            <div className="grid">
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">Estado registro</div>
                {evalRegistro()}
              </div>
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">N° ReProMeliMis</div>
                <div>
                  {maskNroRepromelimis(
                    productor.productor_responsable.repromelimis
                      ?.nro_repromelimis
                  )}
                </div>
              </div>
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">Fecha Vencimiento</div>
                <div>
                  {formatDate(
                    "dd/mm/yyyy",
                    productor.productor_responsable.repromelimis
                      ?.fecha_vencimiento
                  )}
                </div>
              </div>
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">CUIT/CUIL</div>
                <div>{productor.productor_responsable.cuit}</div>
              </div>
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">Apellido</div>
                <div>{productor.productor_responsable.apellido}</div>
              </div>
              <div className="col-12 lg:col-4">
                <div className="font-bold mb-2">Nombres</div>
                <div>{productor.productor_responsable.nombres}</div>
              </div>
            </div>
          </Fieldset>
        </>
      )}
    </>
  );
};

export default DatosProductor;
