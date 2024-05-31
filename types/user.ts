export interface registerFormInput {
	user: {
		name: string;
		email: string;
		password: string;
		cpassword: string;
	};
}
export interface loginFormInput {
	user: {
		email: string;
		password: string;
	};
}
export interface userType {
	user: {
		name: string | undefined | null;
		email: string | null | undefined;
		uid: string | undefined;
		token: string | undefined;
	};
}
export interface UserContextProps {
	user: userType | null;
	loginUser: (user: userType) => void;
	logoutUser: () => void;
}
