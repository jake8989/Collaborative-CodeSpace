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

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<userType | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const loginUser = (newUser: userType) => {
		setUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser));
	};

	const logoutUser = () => {
		setUser(null);
		localStorage.removeItem('user');
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
