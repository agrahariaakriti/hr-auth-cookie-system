import { useEffect, createContext, useState } from "react";
import api from "../api/axios";
export const DataContext = createContext([]);

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await api.get("/protected");

        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    loadingData();
  }, []);
  //
  //
  //
  //
  return (
    <DataContext.Provider value={{ setUserData, userData, loading }}>
      {children}
    </DataContext.Provider>
  );
}
