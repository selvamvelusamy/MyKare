import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Topbar from '../../components/Topbar/Topbar';
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";


const Dashboard = () => {

    const history = useHistory();

    //Avoid unautheticated users to enter this page
    useEffect(() => {
        if(!localStorage.getItem('uid')) {
            history.push('/');
        }
    }, []); //eslint-disable-line

    const uid = localStorage.getItem('uid');

    const user = localStorage.getItem('name');

    //Handling logout
    const onClickLogoutHandler = () => {
        localStorage.setItem('uid', '');
        history.push('/');
    }
    return <div className="dashboard-container">
        <Topbar onClickLogout={onClickLogoutHandler} user={user}/>
        {uid === 'admin' && <AdminHome />}
        {uid !== 'admin' && <UserHome />}
    </div>
}

export default Dashboard;