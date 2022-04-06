import { useState, useEffect } from 'react'
import firebase from '../firebaseConfig';

export interface IFormatAuthUser {
    uid: string | undefined,
    email: string | null | undefined
}