import gifka from "./error.gif";
const Error = () => {
  return (
    <img
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={gifka}
      alt="Error"
    />
  );
};
export default Error;
