import firebase from 'firebase/compat/app'
export default interface IUser {
    uid: string
    username: string
    firstName: string
    lastName: string
    birthDate: Date
    bio: string
    followers?: firebase.firestore.CollectionReference
    following?: firebase.firestore.CollectionReference
    posts?: firebase.firestore.CollectionReference
    postsNumber?: number
    followersNumber?: number
    followingNumber?: number
}