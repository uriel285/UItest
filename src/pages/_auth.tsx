if (typeof window !== "undefined") {
    // Next.js usa este paquete para el overlay
    // Esto lo deshabilita
    // @ts-ignore
    window.__NEXT_REACT_DEVTOOLS_GLOBAL_HOOK__ = null;
  }
  