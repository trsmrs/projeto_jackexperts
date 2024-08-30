import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import styles from '../styles/UserInfo.module.css';

// Esse script basicamente pega o nome do usuário logado e coloca no header

const UserInfo = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name); 
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }
    }
  }, []);

  return (
    <div className={styles.userInfoContainer}>
      {userName && (
        <>
          <span className={styles.userName}>Olá, {userName}</span>
        </>
      )}
    </div>
  );
};

export default UserInfo;
