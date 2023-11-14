import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Axios from '../libs/api';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.hash.substr(1));
  const accessToken = urlSearchParams.get('access_token');

    // 로그인 상태 설정
    const setLoginState = useSetRecoilState(LoginState);

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      navigate('/');
          Axios.post(
            'user/signIn',
            {
              platform: 'google',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
              },
            },
          )
            .then((res) => {
              const data = res.data.data;
              console.log(data);
              localStorage.setItem('access-token', data.accessToken);
              setLoginState({
                isLogin: true,
                userId: data.id,
                profile: data.picture,
                name: '',
              });
            })
            .catch((err) => console.error(err));
    }
  }, []);

  return <></>;
};

export default GoogleLogin;