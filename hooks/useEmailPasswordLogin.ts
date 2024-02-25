import React from 'react';
import { useState, useEffect } from 'react';
import { loginFormInput } from '../types/user';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
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
				// setLoading(false);
				// toast.success('Logged In Succesfully', {
				// 	position: 'bottom-center',
				// });
				const user: userType = {
					user: {
						name: response.user?.displayName,
						email: formData.user.email,
						token: 'khali',
						uid: response.user?.uid,
					},
				};
				// loginUser(user);
				// console.log(response);
				// router.push('/');
				const postData = {
					userId: user.user.uid,
					email: user.user.email,
					password: formData.user.password,
				};
				axios
					.post(
						`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/login-user`,
						postData
					)
					.then((response: AxiosResponse) => {
						setLoading(false);
						cookie.set('token', response.data?.clUser?.user?.token);
						user.user.token = response.data?.clUser?.user?.token;
						loginUser(user);
						toast.success('Logged In Succesfully', {
							position: 'bottom-center',
						});
						router.push('/');
					})
					.catch((err) => {
						setLoading(false);
						console.log('err', err);
						toast.error(
							`${
								err.response?.data?.message != undefined
									? err.response?.data?.message
									: 'Server Error'
							}`,
							{
								position: 'bottom-center',
							}
						);
						return;
					});
			})
			.catch((err) => {
				setLoading(false);
				toast.error(`${err.message}`, {
					position: 'bottom-center',
				});

				console.log(err);
				return;
			});
	};
	return { emailPasswordLogin, loading };
};
export default useEmailPasswordLogin;
