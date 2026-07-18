import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
