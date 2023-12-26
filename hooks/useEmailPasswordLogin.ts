import React from 'react';
import { useState, useEffect } from 'react';
import { loginFormInput } from '../types/user';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
const useEmailPasswordLogin = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { loginUser } = useUser();
	const emailPasswordLogin = (
		formData: loginFormInput,
		setFormData: React.Dispatch<React.SetStateAction<loginFormInput>>,
		router: NextRouter,
		toast: any
	) => {
		setLoading(true);
		firebaseSDK
			.auth()
			.signInWithEmailAndPassword(formData.user.email, formData.user.password)
			.then((response) => {
				setLoading(false);
				toast.success('Logged In Succesfully', {
					position: 'bottom-center',
				});
				const user: userType = {
					user: {
						name: response.user?.displayName,
						email: formData.user.email,
						token: 'khali',
						uid: response.user?.uid,
					},
				};
				loginUser(user);
				console.log(response);
				router.push('/');
			})
			.catch((err) => {
				setLoading(false);
				toast.error(`${err.message}`, {
					position: 'bottom-center',
				});
				console.log(err);
			});
	};
	return { emailPasswordLogin, loading };
};
export default useEmailPasswordLogin;
