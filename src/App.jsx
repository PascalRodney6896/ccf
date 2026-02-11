import { Routes, Route, Navigate } from "react-router-dom";
import CreditLimitResponse from "./Components/CreditLimitResponse";
import "./App.css";
function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/credit-limit?ref=TEST123" replace />}
      />

      {/* Consent page */}
      <Route
        path="/credit-limit"
        element={<CreditLimitResponse />}
      />

      {/* Catch-all */}
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-red-600">
            Page not found
          </div>
        }
      />
    </Routes>
  );
}

export default App;
