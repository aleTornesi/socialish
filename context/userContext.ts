import { createContext, useContext } from 'react'
import { IFormatAuthUser } from './useFirebaseAuth';
import { auth } from '../firebaseConfig';

export interface IContext {
  email: string | null | undefined,
  uid: string | undefined,
}

export const AuthUserContext = createContext<IContext>({
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid
});
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);