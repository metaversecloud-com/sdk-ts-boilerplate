import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center p-16 max-w-96 shadow-lg border rounded-3xl">
        <h1>404</h1>
        <h5 className="text-center my-4">
          Oops. Looks like the page you&apos;re looking for no longer exists. But we&apos;re here to bring you back to
          safety.
        </h5>
        <Link className="btn" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
