import Sample from "@/features/Sample";
// import { Button } from "@/components/ui/button"
import { Header } from "./components/layout/Header";
// import { Login } from "./pages/auth/Login";
// import { DashSidebar } from "./pages/dashboard/DashSidebar";
import { AllRoutes } from "./AllRoutes";

function Home() {
  return (
    <div >
      <Header />
      <AllRoutes />
      {/* <DashSidebar /> */}
    </div>
  )
}

export default Home;