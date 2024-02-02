import { useRef } from "react";
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

export default function ButtonMenu({ items, tooltip}) {
  const refItemsAdm = useRef(null);

  return (
    <>
      <TieredMenu model={items} popup ref={refItemsAdm} />
      <Button
        tooltip={tooltip}
        onClick={(event) => refItemsAdm.current.toggle(event)}
        icon="pi pi-bars"
        className="p-button-sm p-button-outlined p-button-secondary mt-2"
      />
    </>
  );
}
