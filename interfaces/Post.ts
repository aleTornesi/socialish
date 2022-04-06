import firebase from "firebase/compat";
import IUser from "./User";

export default interface IPost{
    id: string,
    text: string,
    image: [],
    createdAt: Date
    user?: IUserData,
    likesNumber: number
}

interface IUserData {
    uid: string,
    username: string
}