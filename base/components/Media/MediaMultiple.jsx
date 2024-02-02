import {
  FileInputButton,
  FileCard,
  FullScreen,
  ImagePreview,
} from "@files-ui/react";
import { useState } from "react";
import useGenericDelete from "@/base/hooks/useGenericDelete";

export default function MediaMultiple(props) {
  const [imgSrc, setImgSrc] = useState(undefined);
  const { genericDelete } = useGenericDelete();

  // Funcion que obtiene nuevos archivos
  const getNewFiles = (incommingFiles) => {
    let newFiles = [];
    // Obtenemos archivos seleccionados
    incommingFiles.forEach((fileData) => {
      // Si el elemento no es un array, es uno o el archivo que añadi
      if (!Array.isArray(fileData)) {
        newFiles.push({
          id: fileData.id,
          size: fileData.size,
          mime_type: fileData.type,
          file_name: fileData.name,
          file: fileData.file,
        });
      }
    });
    return newFiles;
  };

  const updateFiles = (incommingFiles) => {
    // Valores anteriores
    const prevFiles = props?.value ?? [];

    // Nuevos valores
    const newFiles = getNewFiles(incommingFiles);

    // Simulamos event
    const event = {
      target: {
        value: [...newFiles, ...prevFiles],
        name: props.name,
      },
    };

    // Ejecutamos onChange que le pasamos
    props.onChange(event);
  };

  const cleanFile = (id) => {
    // Filtramos y quitamos el id que le pasamos
    const newValues = props.value.filter((item) => item.id != id);

    // Simulamos event
    const event = {
      target: {
        value: newValues,
        name: props.name,
      },
    };

    // Ejecutamos onChange que le pasamos
    props.onChange(event);
  };

  const removeFile = async (id, original_url) => {
    // Ejecutamos la eliminacion del registro
    if (original_url) {
      const url = `/media/destroy-byid/${id}`;
      genericDelete(url, null, () => cleanFile(id));
      return;
    }

    // Sino solo limpiamos file
    cleanFile(id);
  };

  const handleSee = (imageSource) => {
    setImgSrc(imageSource);
  };

  const renderImages = () => {
    return props.value.map((item) => {
      return (
        <div className="col-12 xl:col-6">
          <FileCard
            key={item.id}
            id={item?.id}
            size={item?.size}
            type={item?.mime_type}
            name={item?.file_name}
            file={item?.file}
            imageUrl={item?.original_url}
            downloadUrl={item?.original_url}
            onDelete={() => removeFile(item.id, item.original_url)}
            preview
            onSee={item.mime_type.includes("image") ? handleSee : undefined}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div>
        <div className="text-base mb-2">{props.label}</div>
        <div className="d-flex">
          <FileInputButton
            type="button"
            label="Seleccionar archivo"
            className="mb-3"
            value={props.value ? [props.value] : []}
            onChange={updateFiles}
            accept={`${props.acceptImages ? "image/*," : ""} ${
              props.acceptPdf ? ".pdf" : ""
            }`}
          />
          {props?.value?.length > 0 && (
            <div className="grid">{renderImages()}</div>
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
