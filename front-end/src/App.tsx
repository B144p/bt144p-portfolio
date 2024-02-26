import { Spin } from "antd";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { RouterScope } from "./router";

const Loading = () => {
  return (
    <div>
      <Spin />
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PageRender />
    </Suspense>
  );
};

const PageRender = () => {
  const routers = RouterScope();
  const ROUTER_SCOPE = useRoutes(routers);

  return ROUTER_SCOPE;
};

export default App;
