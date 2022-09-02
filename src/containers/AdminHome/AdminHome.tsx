import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import './AdminHome.scss';

import * as UserService from "../../services/user.service";
import UserModel from "../../models/user.model";
import UserTile from "../../components/UserTile/UserTile";

const AdminHome = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [users, setUsers] = useState<Array<UserModel>>([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    //Getting all the users
    const getAllUsers = async () => {
        setLoading(true);
        const users = await UserService.getAllUsers();
        if(users) {
            setUsers(users);
        }
        setLoading(false);
    }

    return <Spin spinning={loading}>
        <div className="admin-home-container">
            <div className="title">Users</div>
            <div className="users">
                {users.map((user, index) => <UserTile key={index} user={user}/>)}
            </div>
        </div>
    </Spin>
}

export default AdminHome;