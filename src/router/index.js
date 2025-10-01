import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import WhyThisProjectPage from "../pages/WhyThisProjectPage";
import GoalsPage from "../pages/GoalsPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import ExperiencePage from "../pages/ExperiencePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/why-project",
    element: <WhyThisProjectPage />,
  },
  {
    path: "/goals",
    element: <GoalsPage />,
  },
  {
    path: "/activities",
    element: <ActivitiesPage />,
  },
  {
    path: "/experience",
    element: <ExperiencePage />,
  },
]);
