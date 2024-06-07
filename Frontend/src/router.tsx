import { createBrowserRouter } from "react-router-dom"
import Home from "./components/home/home"
import RegisterCompany from "./components/company/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/company/register",
    element: <RegisterCompany />
  },
  {
    path: "*",
    element: <div>404</div>
  }
])

export default router;
