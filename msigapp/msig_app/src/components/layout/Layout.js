import React  from 'react';
import styles from './layout.module.css'
import SideBar from '../Sidebar/SideBar';

function Layout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <SideBar />
            <div className={styles.childrenContainer}>
                {children}
            </div>
        </div>
    );
}

export default Layout;