import { Auth, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'
import firebaseConfig from './firebaseProjectConfig'

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth: Auth = getAuth()