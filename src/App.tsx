import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import TeacherDetails from "./pages/TeacherDetails";
import Settings from "./pages/Settings";
import LoadingSpinner from "./components/LoadingSpinner";
import Expenses from "./pages/Expenses";
import BankWithdrawals from "./pages/BankWithdrawals";

const Teachers = React.lazy(() => import("./pages/Teachers"));
const Levels = React.lazy(() => import("./pages/Levels"));
const Branches = React.lazy(() => import("./pages/Branches"));
const Subjects = React.lazy(() => import("./pages/Subjects"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Payments = React.lazy(() => import("./pages/Payments"));
const Commissions = React.lazy(() => import("./pages/Commissions"));

function App() {
  return (
    <ErrorBoundary>
      {/* <AuthProvider> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-auto p-6">
                      <React.Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/students" element={<Students />} />
                          <Route
                            path="/students/:id"
                            element={<StudentDetails />}
                          />
                          <Route path="/teachers" element={<Teachers />} />
                          <Route
                            path="/teachers/:id"
                            element={<TeacherDetails />}
                          />
                          <Route path="/levels" element={<Levels />} />
                          <Route path="/branches" element={<Branches />} />
                          <Route path="/subjects" element={<Subjects />} />
                          <Route path="/groups" element={<Groups />} />
                          <Route path="/payments" element={<Payments />} />
                          <Route
                            path="/commissions"
                            element={<Commissions />}
                          />
                          <Route path="/expenses" element={<Expenses />} />
                          <Route
                            path="/bank-withdrawals"
                            element={<BankWithdrawals />}
                          />
                          <Route path="/settings" element={<Settings />} />
                          <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                          />
                        </Routes>
                      </React.Suspense>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* </AuthProvider> */}
    </ErrorBoundary>
  );
}

export default App;
