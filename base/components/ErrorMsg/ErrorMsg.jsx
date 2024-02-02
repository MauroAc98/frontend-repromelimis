import { Messages } from "primereact/messages";
import { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import Link from "next/link";

export default function InlineMsg({ detail, buttonText, redirectUrl }) {
  const inline = useRef(null);

  useEffect(() => {
    inline.current.show({
      severity: "error",
      detail: detail,
      sticky: true,
      closable: false,
    });
  }, []);

  return (
    <>
      <Messages ref={inline} />
      <div className="text-center">
        <Link href={redirectUrl}>
          <Button label={buttonText} className="p-button-secondary" />
        </Link>
      </div>
    </>
  );
}
