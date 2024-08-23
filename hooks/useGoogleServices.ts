import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
const useGoogleServices = () => {
  const [loadingWithGoogle, setLoading] = useState<boolean>(false);
  const { loginUser } = useUser();
  const googleServices = (router: NextRouter, toast: any) => {
    const googleProvider = new firebaseSDK.auth.GoogleAuthProvider();
    setLoading(true);
    firebaseSDK
      .auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        const user: userType = {
          user: {
            name: response.user?.displayName,
            email: response.user?.email,
            token: 'khali',
            uid: response.user?.uid,
          },
        };

        ///do backend stuff for new user
        ///requests for backend
        const postData = {
          userId: user.user.uid,
          name: user.user.name,
          email: user.user.email,
          strategy: 'GOOGLE',
          isNewAccount: response.additionalUserInfo?.isNewUser,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/googleRequestHandler`,
            postData,
          )
          .then((response: AxiosResponse) => {
            setLoading(false);
            cookie.set('token', response.data?.clUser?.user?.token, {
              expires: 7,
            });
            user.user.token = response.data?.clUser?.user?.token;
            toast.success(
              postData.isNewAccount
                ? 'Account Created Succesfully'
                : 'Logged In Successfully',
              {
                position: 'bottom-center',
              },
            );
            loginUser(user);
            let url = cookie.get('previous_step');
            if (url) router.push(url);
            router.push('/');
          })
          .catch((err) => {
            setLoading(false);
            toast.error(`${err.response?.data?.message}`, {
              position: 'bottom-center',
            });
          });
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(`${err.message}`, {
          position: 'bottom-center',
        });
      });
  };
  return { googleServices, loadingWithGoogle };
};
export default useGoogleServices;
