import Firebase from '../configs/firebase.config';

interface UserModel {
    id?: string;
    name: string;
    username: string;
    password: string;
    phoneNumber: number | undefined;
}

const docToUserModel = (doc: Firebase.firestore.DocumentSnapshot): UserModel => {
    const docData: any = doc.data();
    const data: UserModel = {
        id: doc.id,
        name: docData.name ?? '',
        username: docData.username ?? '',
        password: docData.password ?? '',
        phoneNumber: docData.phoneNumber ?? null,
    };

    return data;
}

export default UserModel;
export { docToUserModel };