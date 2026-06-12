import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Index from "./pages/Index/Index";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/index" element={<Index />} />
        </Routes>
    );
}

export default App;