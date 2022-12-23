import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";
function Loading() {
  return (
    <div className="box">
      <Spinner animation="grow" role="status" className="custom">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
