import { Link } from 'react-router-dom';
export default function NotFoundPage(){ return <div className="max-w-3xl mx-auto py-20 text-center"><h1 className="text-4xl font-bold">404</h1><p className="mt-2">Page not found</p><Link className="btn inline-block mt-5" to="/">Go Home</Link></div> }
