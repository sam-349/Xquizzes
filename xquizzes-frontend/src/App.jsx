import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardNavbar from "./components/DashboardNavbar";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";
import ReportPage from "./pages/ReportPage";

function Layout() {
  const location = useLocation();

  // Show DashboardNavbar on dashboard, test page and report page
  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/test") ||
    location.pathname.startsWith("/report");

  return (
    <>
      {isDashboard ? <DashboardNavbar /> : <Navbar />}

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Test Page */}
          <Route path="/test/:subject" element={<TestPage />} />

          {/* Report Page */}
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>

      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
