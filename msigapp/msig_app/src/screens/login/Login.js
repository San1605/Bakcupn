import React from 'react';
import styles from './login.module.css'

import LoginForm from '../../components/loginForm/LoginForm'

import Bot from '../../assets/bot.png'
import Title from '../../assets/ai-title.svg';
import OrgLogo from '../../assets/org-logo.png'

const Login = () => {
    return (
        <div className={styles.backgrondColor}>
            <div className={styles.backgroundVector}>
                <div className={styles.Ctlogo}>
                    <img src={OrgLogo} alt='Logo'/>
                </div>
                <div className={styles.botImage}>
                    <img src={Bot} alt='bot' />
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.mainHeader}>
                        <img src={Title} alt='' />
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;