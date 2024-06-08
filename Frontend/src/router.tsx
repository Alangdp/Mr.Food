import { createBrowserRouter } from "react-router-dom"
import Home from "./components/home/home"
import CompanyRegister from "./components/company/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/company/register",
    element: <CompanyRegister />
  },
  {
    path: "*",
    element: <div>404</div>
  }
])

export default router;
