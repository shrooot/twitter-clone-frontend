import React, { ReactNode, useEffect } from 'react';
import styles from "../../stylesheets/Layout.module.css"; // Import the CSS file
import Menubar from '../Menubar'
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CHECK_ENDPOINT } from '../../utils/endpoints';

interface GlobalLayoutProps {
    children: ReactNode
}

const Layout = ({ children }: GlobalLayoutProps) => {

    const navigate = useNavigate()

    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(CHECK_ENDPOINT, { withCredentials: true })
            } catch (err: any) {
                navigate("/login")
            }
        }
        checkAuth()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Menubar />
                {children}
                <Sidebar />
            </div>
        </div>
    );
};

export default Layout;
