import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/Index";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/index" element={<Index />} />
        </Routes>
    );
}

export default App;