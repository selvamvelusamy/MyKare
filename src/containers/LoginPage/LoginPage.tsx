import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, notification, Spin } from 'antd';
import { useHistory } from "react-router-dom";

import './LoginPage.scss';
import AddUser from "../AddUser/AddUser";
import * as UserService from '../../services/user.service';

import UserModel from "../../models/user.model";


const LoginPage = () => {

    const history = useHistory();

    //Helper for loading
    const [loading, setLoading] = useState<boolean>(false);

    const [userId, setUserId] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);

    //Getting user details
    useEffect(() => {getUserData()}, []); //eslint-disable-line

    useEffect(() => {
        if(userId) {
            history.push('/dashboard');
        }
    }, [userId])//eslint-disable-line

    //Helper for gtting user data
    const getUserData = async () => {
        const userId = localStorage.getItem('uid');
        if(userId) {
            setUserId(userId);
            history.push('/dashboard');
        }
    }

    const onFinish = async (data: any) => {
        setLoading(true);
        //Check if user is admin
        if(data.username === 'admin') {
            if(data.password === 'admin') {
                localStorage.setItem('uid', 'admin');
                localStorage.setItem('name', 'Admin');
                setUserId('admin');
                history.push('/dashboard');
            }
        } else { //Non Admin user
            const userDetails = await UserService.getUserDetails(data);
            if(userDetails.status === 0) {
                notification.warning({
                    message: 'No users found with given credentials'
                });
            }
            if(userDetails.status === -1) {
                notification.error({
                    message: 'Error while getting user details'
                })
            }
            if(userDetails.status === 1) {
                if(userDetails.data?.id) {
                    localStorage.setItem('uid', userDetails.data?.id);
                    localStorage.setItem('name', userDetails.data.name);
                    history.push('/dashboard');
                }
            }
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        notification.warning({
            message: 'Please give a proper credentials'
        });
    };

    const createUserHandler = async (user: UserModel) => {
        setShowModal(false);
        setLoading(true);
        const data = await UserService.createUser(user);
        if(data.status === 0) {
            notification.warning({
                message: 'User already exist with the username'
            })
        }
        if(data.status === 1) {
            if(data.uid) {
                localStorage.setItem('uid', data.uid);
                localStorage.setItem('user', user.name);
                notification.success({
                    message: `Welcome ${user.name}`
                })
                history.push('/dashboard');
            }
        }
        setLoading(false);
    }

    return (
        <Spin spinning={loading}>
            <div className="login-page-container">
                <div className="login-title">Welcome</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div onClick={() => {setShowModal(true)}} className="new-user-text">New User?</div>
            </div>
            <Modal 
                title="Add New User"
                footer={null}
                visible={showModal}
                onCancel={() => {setShowModal(false)}}
            >
                <AddUser 
                    onCancel={() => {setShowModal(false)}}
                    onCreate={createUserHandler}
                />
            </Modal>
        </Spin>
    )
}

export default LoginPage;