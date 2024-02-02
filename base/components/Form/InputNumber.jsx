import { InputNumber as InputPrimeReact } from "primereact/inputnumber";
import { useRef, useEffect } from "react";

export const InputNumber = (props) => {
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const name = event.originalEvent.target.name;
    const value = event.value;
    const _event = {
      target: {
        name: name,
        value: value,
      },
    };
    props.onChange(_event);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("autoComplete", "off");
    }
  }, []);

  return (
    <InputPrimeReact
      {...props}
      inputRef={inputRef}
      onChange={(event) => handleChange(event)}
    />
  );
};
