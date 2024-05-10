import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo AuthContext
const AuthContext = createContext<{
  userID: string | null;
  setUserID: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  userID: null,
  setUserID: () => null,
});

// Tạo AuthProvider, nơi bạn sẽ lưu trữ và quản lý state
export const AuthProvider: React.FC = ({ children }) => {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      console.log(`index ${storedUserID}`);
      if (storedUserID) {
        setUserID(storedUserID);
      }
    };

    fetchUserID();
  }, [userID]);

  return (
    <AuthContext.Provider value={{ userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng context này
export const useAuth = () => useContext(AuthContext);
