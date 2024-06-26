import { userType } from '../types/user';
import { UserContextProps } from '../types/user';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import firebaseSDK from '../firebase';
import cookie from 'js-cookie';
import useGetAllProjects from '../hooks/useGetAllProjects';
// import { toast } from 'react-toastify';
import { useFile } from './fileContext';
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userType | null>(null);
  const { getAllProjects } = useGetAllProjects();
  const { defaultFileSetting } = useFile();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (newUser: userType) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    const owner_id: string | undefined = newUser?.user?.uid;
    if (!owner_id) return;
    cookie.set('user_id', owner_id, { expires: 7 });
  };

  const logoutUser = () => {
    setUser(null);
    defaultFileSetting();
    localStorage.removeItem('user');
    cookie.remove('token');
    cookie.remove('user_id');
    // getAllProjects(toast);
    firebaseSDK.auth().signOut();
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
