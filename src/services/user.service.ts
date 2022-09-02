import { notification } from "antd";

import { db } from "../configs/firebase.config";
import UserModel, { docToUserModel } from "../models/user.model";

//Getting user details
export const getUserDetails = async (data: {username: string, password: string}):Promise<{status: number, data: UserModel | null}> => {
    try {
        const userMetaData = await db.collection('users')
        .where('username', '==', data.username)
        .where('password', '==', data.password)
        .get();
        if(!userMetaData.empty) {
            const userData: UserModel = docToUserModel(userMetaData.docs[0]);
            return ({
                status: 1,
                data: userData
            });
        } else {
            return({
                status: 0,
                data: null
            });
        }
    } catch (err) {
        notification.error({
            message: 'Something went wrong while getting details. Please try again later'
        })
        console.log('Error - User Service - Error while getting user details', err);
        return({
            status: -1,
            data: null
        })
    }
}

//Create new user
export const createUser = async (user: UserModel): Promise<{status: number, uid: string | null}> => {
    try {
        //Getting existing user details
        const existingUserMetaData = await db.collection('users').where('username', '==', user.username).get();
        if(existingUserMetaData.empty) {
            const userRef = db.collection('users').doc();
            await userRef.set({
                name: user.name,
                phoneNumber: user.phoneNumber,
                username: user.username,
                password: user.password
            });
            return ({
                status: 1,
                uid: userRef.id
            });
        } else {
            return({
                status: 0,
                uid: existingUserMetaData.docs[0].id
            })
        }
    } catch (err) {
        notification.error({
            message: 'Error wjile creating user'
        });
        console.log('Error - User Service - Error while creting user', err);
        return({
            status: -1,
            uid:  null
        })
    }
}

//Getting all the users for admin
export const getAllUsers = async (): Promise<Array<UserModel> | null> => {
    try {
        const usersMetaData = await db.collection('users').get();
        const users: Array<UserModel> = [];
        usersMetaData.docs.forEach(doc => {
            users.push(docToUserModel(doc));
        })
        return users;
    } catch (err) {
        console.log('Error - User Service - Error while getting users');
        notification.error({
            message: 'Error while getting users'
        })
        return null;
    }
}