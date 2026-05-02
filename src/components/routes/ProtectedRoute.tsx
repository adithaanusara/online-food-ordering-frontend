import { Navigate } from 'react-router-dom';
import { Role } from '../../types';
import { useAuth } from '../../context/AuthContext';
export default function ProtectedRoute({children, role}:{children:React.ReactNode; role?:Role}){ const {user}=useAuth(); if(!user) return <Navigate to="/signin" replace/>; if(role && user.role!==role) return <Navigate to="/" replace/>; return <>{children}</>; }
