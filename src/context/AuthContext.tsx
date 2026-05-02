import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import * as authService from '../services/authService';
interface AuthContextValue { user: User | null; token: string | null; login:(email:string,password:string)=>Promise<void>; register:(name:string,email:string,password:string)=>Promise<void>; logout:()=>void; }
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
 const [user,setUser]=useState<User|null>(null); const [token,setToken]=useState<string|null>(null);
 useEffect(()=>{ const u=localStorage.getItem('user'); const t=localStorage.getItem('token'); if(u&&t){setUser(JSON.parse(u));setToken(t)} },[]);
 async function save(res:{token:string;user:User}){ localStorage.setItem('token',res.token); localStorage.setItem('user',JSON.stringify(res.user)); setToken(res.token); setUser(res.user); }
 async function login(email:string,password:string){ await save(await authService.signIn(email,password)); }
 async function register(name:string,email:string,password:string){ await save(await authService.signUp(name,email,password)); }
 function logout(){ localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); }
 return <AuthContext.Provider value={{user,token,login,register,logout}}>{children}</AuthContext.Provider>;
}
export function useAuth(){ const ctx=useContext(AuthContext); if(!ctx) throw new Error('useAuth must be used inside AuthProvider'); return ctx; }
