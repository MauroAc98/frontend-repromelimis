import {
  FileInputButton,
  FileCard,
  FullScreen,
  ImagePreview,
} from "@files-ui/react";
import { useState } from "react";
import useGenericDelete from "@/base/hooks/useGenericDelete";

export default function Media(props) {
  const [imgSrc, setImgSrc] = useState(undefined);
  const { genericDelete } = useGenericDelete();

  const updateFiles = (incommingFiles) => {
    // Obtenemos archivo seleccionado
    const fileData = incommingFiles[0];

    // Creamos obj a setear
    const contenidoObj = {
      id: fileData.id,
      size: fileData.size,
      mime_type: fileData.type,
      file_name: fileData.name,
      file: fileData.file,
    };

    // Simulamos event
    const event = {
      target: {
        value: contenidoObj,
        name: props.name,
      },
    };

    // Ejecutamos onChange que le pasamos
    props.onChange(event);
  };

  const cleanFile = () => {
    // Simulamos event
    const event = {
      target: {
        value: null,
        name: props.name,
      },
    };

    // Ejecutamos onChange que le pasamos
    props.onChange(event);
  };

  const removeFile = async () => {
    // Ejecutamos la eliminacion del registro
    if (props.value?.original_url) {
      const url = `/media/destroy-byid/${props.value.id}`;
      genericDelete(url, null, cleanFile);
      return;
    }

    // Sino solo limpiamos file
    cleanFile();
  };

  const handleSee = (imageSource) => {
    setImgSrc(imageSource);
  };

  return (
    <>
      <div>
        <div className="text-base mb-2">{props.label}</div>
        <div className="d-flex">
          {props.value ? (
            <div className="grid">
              <div className="col-12">
                <FileCard
                  id={props.value?.id}
                  size={props.value?.size}
                  type={props.value?.mime_type}
                  name={props.value?.file_name}
                  file={props.value?.file}
                  imageUrl={props.value?.original_url}
                  downloadUrl={props.value?.original_url}
                  onDelete={removeFile}
                  preview
                  onSee={
                    props.value.mime_type.includes("image")
                      ? handleSee
                      : undefined
                  }
                />
              </div>
            </div>
          ) : (
            <FileInputButton
              type="button"
              label="Seleccionar archivo"
              value={props.value ? [props.value] : []}
              onChange={updateFiles}
              accept={`${props.acceptImages ? "image/*," : ""} ${
                props.acceptPdf ? ".pdf" : ""
              }`}
            />
          )}
        </div>

        {/* Image Preview */}
        <FullScreen
          open={imgSrc !== undefined}
          onClose={() => setImgSrc(undefined)}
        >
          <ImagePreview src={imgSrc} style={{ maxHeight: "1000px" }} />
        </FullScreen>
      </div>
    </>
  );
}
