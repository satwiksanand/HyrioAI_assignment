import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-5xl p-2 m-2">
        Company Job Posting
      </h1>
      <hr />
      <div className="h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
