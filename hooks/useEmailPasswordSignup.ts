import React from 'react';
import { useState, useEffect } from 'react';
import { registerFormInput } from '../types/user';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { Axios, AxiosResponse } from 'axios';
import cookie from 'js-cookie';
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
				const user: userType = {
					user: {
						name: response.user?.displayName,
						email: formData.user.email,
						token: 'khali',
						uid: response.user?.uid,
					},
				};

				//backend -service------- user storing request
				const postData = {
					userId: user.user.uid,
					name: user.user.name,
					email: user.user.email,
					password: formData.user.password,
					strategy: 'LOCALEMAIL',
				};
				axios
					.post(
						`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/new-user`,
						postData
					)
					.then((response: AxiosResponse) => {
						// console.log(response);
						setFormData({ ...formData });
						setLoading(false);
						cookie.set('token', response.data?.clUser?.user?.token, {
							expires: 7,
						});
						user.user.token = response.data?.clUser?.user?.token;
						loginUser(user);
						toast.success('Account Created Succesfully', {
							position: 'bottom-center',
						});
						let url = cookie.get('previous_step');
						if (url) router.push(url);
						else router.push('/');
					})
					.catch((err: any) => {
						setLoading(false);
						console.log('err', err);
						////////////////////////////////////
						// deleting firebase user
						function deleteUserFromFirebase(userId: string | undefined) {
							if (userId == undefined) return;
							const fuser = firebaseSDK.auth().currentUser;
							if (fuser && fuser.uid == userId) {
								fuser
									.delete()
									.then((res: any) => {
										console.log(
											'If Mongo Throws an error then firebase will also delete the stored user'
										);
									})
									.catch((e: any) => {
										console.log('Something Went Wrong', e);
									});
							}
						}
						deleteUserFromFirebase(user?.user?.uid);
						toast.error(
							`${
								err.response?.data?.message
									? err.response?.data?.message
									: 'Server Error'
							}`,
							{
								position: 'bottom-center',
							}
						);
					});
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
