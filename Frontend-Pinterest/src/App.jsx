import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Index from "./pages/Index/Index";
import PostDetail from "./pages/PostDetail/PostDetail";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/Terms/Terms";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/index" element={<Index />} />
            <Route path="/post" element={<PostDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/terms" element={<Terms />} />
        </Routes>
    );
}

export default App;