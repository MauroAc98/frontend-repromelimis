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
    }
  };

  const evalMessage = () => {
    switch (responseData.status) {
      case "SUCCESS":
        return <div className="text-center">{responseData.message}</div>;
      case "ERROR":
        return <div className="text-center">{responseData.message}</div>;
    }
  };

  const evalTitle = () => {
    switch (responseData.status) {
      case "SUCCESS":
        return "Realizado!";
      case "ERROR":
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
