// In your main App.jsx or router configuration
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Methodologies from './pages/Methodologies';
import MRVEngine from './pages/MRVEngine';
import VM0033Form from './pages/MethodologyForms/VM0033Form';
import VM0007Form from './pages/MethodologyForms/VM0007Form';
import GoldStandardForm from './pages/MethodologyForms/GoldStandardForm';
import IPCCForm from './pages/MethodologyForms/IPCCForm';
import PVBlueCarbonForm from './pages/MethodologyForms/PVBlueCarbonForm';
import MyProjects from './pages/MyProjects';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<MyProjects />} />
      <Route path="/methodologies" element={<Methodologies />} />
      <Route path="/mrv" element={<MRVEngine />} />
      <Route path="/methodologies/vm0033" element={<VM0033Form />} />
      <Route path="/methodologies/vm0007" element={<VM0007Form />} />
      <Route path="/methodologies/gold-standard" element={<GoldStandardForm />} />
      <Route path="/methodologies/ipcc" element={<IPCCForm />} />
      <Route path="/methodologies/plan-vivo" element={<PVBlueCarbonForm />} />
    </Routes>
  );
}

export default App;