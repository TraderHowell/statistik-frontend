import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import ClientsList from "./pages/ClientsList";
import ClientDashboard from "./pages/ClientDashboard";
import ClientStreams from './pages/ClientStreams';
import ClientSettings from './pages/ClientSettings';
import StreamEditor from './pages/StreamEditor';

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<ClientsList />} />
                    <Route path="/client-dashboard" element={<ClientDashboard />} />
                    <Route path="/client-streams" element={<ClientStreams />} />
                    <Route path="/client-settings" element={<ClientSettings />} />
                    <Route path="/stream-editor" element={<StreamEditor />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    </div>
    );
}

export default App;
