// pages/_Auth.tsx
import React, { useEffect } from 'react';

const AuthPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Deshabilitar React DevTools en producción
      // @ts-ignore
      window.__NEXT_REACT_DEVTOOLS_GLOBAL_HOOK__ = null;
    }
  }, []);

  return (
    <div>
      <h1>Auth Page</h1>
    </div>
  );
};

export default AuthPage;
