import React from 'react';
import { useState, useEffect } from 'react';
import { loginFormInput } from '../types/user';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
const useForgotPassword = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const forgotPassword = (
		formData: loginFormInput,
		setFormData: React.Dispatch<React.SetStateAction<loginFormInput>>,
		router: NextRouter,
		toast: any
	) => {
		setLoading(true);
		firebaseSDK
			.auth()
			.sendPasswordResetEmail(formData.user.email)
			.then((response) => {
				setLoading(false);
				toast.success(
					'An activation Link has been sent to your Email Please check Your Inbox and Sign In Again',
					{
						position: 'bottom-center',
					}
				);
				console.log(response);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(`${err.message}`, {
					position: 'bottom-center',
				});
				console.log(err);
			});
	};
	return { forgotPassword, loading };
};
export default useForgotPassword;
