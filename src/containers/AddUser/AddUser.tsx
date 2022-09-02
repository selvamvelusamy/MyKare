import React, { useState } from "react";
import { Input, Button, notification, InputNumber } from 'antd';

import './AddUser.scss';

import UserModel from "../../models/user.model";

const Adduser =  (
    {
        onCreate,
        onCancel
    }: {
        onCreate: (user: UserModel) => void;
        onCancel: () => void;
    }
    ) => {

    //Initial data
    const nullState: UserModel = {
        name: '',
        username: '',
        password: '',
        phoneNumber: undefined
    }

    //User data
    const [userData, setUserData] = useState<UserModel>({...nullState});

    //Helper for handling inputs
    const onChangeValuesHandler = (field: string, value: string | number) => {
        setUserData(prevState => {
            const state:any = {...prevState}
            if(field === 'phoneNumber') {
                if(String(value).length < 11) {
                    state[field] = value;
                }
            } else {
                state[field] = value;
            }
            return state;
        })
    }

    //handler for add user data
    const onClickAddUserHandler = () => {
        if(userData.username) {
            if(userData.password) {
                if(userData.name) {
                    if(userData.phoneNumber) {
                        console.log(userData);
                        if(String(userData.phoneNumber).length === 10) {
                            onCreate({...userData});
                            setUserData({...nullState});
                        } else {
                            notification.warning({
                                message: 'Please give the proper phone number',
                            });
                        }
                    } else {
                        notification.warning({
                            message: 'Please fill the phone number',
                        });
                    }
                } else {
                    notification.warning({
                        message: 'Please fill the name',
                    });
                }
            } else {
                notification.warning({
                    message: 'Please fill the password',
                });
            }
        } else {
            notification.warning({
                message: 'Please fill the username',
            });
        }
    }

    //Close Modal handler
    const onCancelHandler = () => {
        setUserData({...nullState});
        onCancel();
    }

    return (<div className="add-user-modal">
        <div className="input-container">
            <div className="title">Name</div>
            <div className="input">
                <Input value={userData.name} onChange={(e) => {onChangeValuesHandler('name', e.target.value)}}/>
            </div>
        </div>
        <div className="input-container">
            <div className="title">Phone Number</div>
            <div className="input">
                <InputNumber style={{width:'100%'}} value={userData.phoneNumber} type={'number'} onChange={(e) => {onChangeValuesHandler('phoneNumber', Number(e))}}/>
            </div>
        </div>
        <div className="input-container">
            <div className="title">Username</div>
            <div className="input">
                <Input value={userData.username} onChange={(e) => {onChangeValuesHandler('username', e.target.value)}}/>
            </div>
        </div>
        <div className="input-container">
            <div className="title">Password</div>
            <div className="input">
                <Input value={userData.password} onChange={(e) => {onChangeValuesHandler('password', e.target.value)}}/>
            </div>
        </div>
        <div className="action-buttons">
            <Button onClick={onClickAddUserHandler} type="primary" style={{marginRight: '4px'}}> Create </Button>
            <Button value={userData.name} onClick={onCancelHandler} type="ghost"> Cancel </Button>
        </div>
    </div>)
}

export default Adduser