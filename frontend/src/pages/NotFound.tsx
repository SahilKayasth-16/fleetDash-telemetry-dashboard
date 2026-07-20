import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 mb-6">
        <Compass className="h-12 w-12 animate-pulse" />
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">404</h1>
      <p className="mt-2 text-lg font-semibold text-slate-200">Off Course: Page Not Found</p>
      <p className="mt-3 text-sm text-slate-400 max-w-sm">
        The coordinates you requested are outside current mapping limits. Double check the address or return to base.
      </p>
      
      <div className="mt-8">
        <Link 
          to="/" 
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/10 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
