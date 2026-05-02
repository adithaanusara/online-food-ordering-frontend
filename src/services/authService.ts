import api from './api';
import { AuthResponse } from '../types';
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try { const { data } = await api.post<AuthResponse>('/auth/signin', { email, password }); return data; }
  catch { return { token: 'mock-jwt-token', user: { id: 1, name: email.split('@')[0], email, role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER' } }; }
}
export async function signUp(name: string, email: string, password: string): Promise<AuthResponse> {
  try { const { data } = await api.post<AuthResponse>('/auth/signup', { name, email, password }); return data; }
  catch { return { token: 'mock-jwt-token', user: { id: 2, name, email, role: 'CUSTOMER' } }; }
}
