'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { fetchAdmins } from '@/lib/adminService';
import { Divide } from 'lucide-react';
import Loader from '@/components/ui/Loader/Loader';

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [adminExists, setAdminExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // run once on app‐startup
    fetchAdmins()
      .then(res => {
        if (Array.isArray(res) && res.length > 0) {
          setAdminExists(true);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // During initial check, you can return a loading indicator if you like:
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader/>
    </div>
  );

  return (
    <AppContext.Provider value={{ adminExists }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppContext not found');
  return ctx;
};
