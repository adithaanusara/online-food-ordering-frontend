import api from './api';
import { Category } from '../types';
const mockCategories: Category[] = [
  { id: 1, name: 'Rice', description: 'Rice meals' },
  { id: 2, name: 'Burgers', description: 'Fast food' },
  { id: 3, name: 'Drinks', description: 'Soft drinks' }
];
export async function getCategories() { try { return (await api.get<Category[]>('/categories')).data; } catch { return mockCategories; } }
export async function createCategory(category: Omit<Category,'id'>) { try { return (await api.post<Category>('/categories', category)).data; } catch { return { id: Date.now(), ...category }; } }
export async function updateCategory(id:number, category:Omit<Category,'id'>) { try { return (await api.put<Category>(`/categories/${id}`, category)).data; } catch { return { id, ...category }; } }
export async function deleteCategory(id:number) { try { await api.delete(`/categories/${id}`); } catch {} }
