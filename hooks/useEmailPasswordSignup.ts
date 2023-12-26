import React from 'react';
import { useState, useEffect } from 'react';
import { registerFormInput } from '../types/user';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
const useEmailPasswordSignup = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { loginUser } = useUser();
	const emailPasswordSignup = (
		formData: registerFormInput,
		setFormData: React.Dispatch<React.SetStateAction<registerFormInput>>,
		router: NextRouter,
		toast: any
	) => {
		setLoading(true);
		firebaseSDK
			.auth()
			.createUserWithEmailAndPassword(
				formData.user.email,
				formData.user.password
			)
			.then(async (response) => {
				await response.user?.updateProfile({
					displayName: formData.user.name,
				});
				return response;
			})
			.then((response) => {
				setLoading(false);
				toast.success('Account Created Succesfully', {
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
				//backend -service------- user storing request
				console.log(response.user);
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
	return { emailPasswordSignup, loading };
};
export default useEmailPasswordSignup;
