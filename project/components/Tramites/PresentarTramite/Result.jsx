export const Result = ({ responseData }) => {
  const evalIcon = () => {
    switch (responseData.status) {
      case "SUCCESS":
        return (
          <i
            className="pi pi-check-circle text-green-600"
            style={{ fontSize: "4rem" }}
          ></i>
        );
      case "ERROR":
        return (
          <i
            className="pi pi-times-circle text-red-600"
            style={{ fontSize: "4rem" }}
          ></i>
        );
      case "ERROR_VALIDATION":
        return (
          <i
            className="pi pi-times-circle text-red-600"
            style={{ fontSize: "4rem" }}
          ></i>
        );
    }
  };

  const evalMessage = () => {
    switch (responseData.status) {
      case "SUCCESS":
        return <div className="text-center">{responseData.message}</div>;
      case "ERROR":
        return <div className="text-center">{responseData.message}</div>;
      case "ERROR_VALIDATION":
        return (
          <>
            <div className="text-center">
              Su trámite presenta errores de validación, reviselos y vuelva a
              presentar.
            </div>
            <div className="p-message p-message-error p-3">
              {responseData.errors.map((item) => (
                <div key={item.section}>
                  <div className="font-bold">{item.section}</div>
                  <ul className="p-3">
                    {item.errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  const evalTitle = () => {
    switch (responseData.status) {
      case "SUCCESS":
        return "Realizado!";
      case "ERROR":
        return "Error!";
      case "ERROR_VALIDATION":
        return "Error!";
    }
  };

  return (
    <div className="mt-3">
      <div className="text-center">{evalIcon()}</div>
      <div className="text-center mt-4">
        <h2>{evalTitle()}</h2>
      </div>
      <div className="mt-3">{evalMessage()}</div>
    </div>
  );
};
