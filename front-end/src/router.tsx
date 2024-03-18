import { lazy } from "react";
import { RouteObject } from "react-router";

const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
// const SelectProject = lazy(() => import("./views/app/SelectProject"));
const LandingPage = lazy(() => import("./views/app/landingPage/LandingPage"));

const publicRouters: RouteObject = {
  path: "/",
  element: <BaseLayout />,
  // children: [{ path: "/", element: <SelectProject /> }],
  children: [
    { path: "/", element: <LandingPage /> },
  ],
};

const defaultRouters: RouteObject = {
  path: "/",
  element: <BaseLayout />,
  children: [
    { path: "404", element: <h1>Page not found</h1> },
    { path: "500", element: <h1>Status 500</h1> },
    { path: "*", element: <h1>Out of case</h1> },
  ],
};

export const RouterScope = () => {
  // const dispatch = useDispatch();
  // const { selected } = useSelector((state: IStore) => state.project);

  // useEffect(() => {
  //   dispatch(selectedProject(localStorage.getItem("project")));
  // }, []);

  return [publicRouters, defaultRouters];
};
