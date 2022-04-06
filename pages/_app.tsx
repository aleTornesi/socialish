import '../styles/globals.scss'
//import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
// Import the functions you need from the SDKs you need
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Script from 'next/script'
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'
import Header from '../components/header'
import { AuthUserContext } from '../context/userContext'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header
				pages={["Amici", "Post consigliati", "Blog"]}
				settings={["Profile", "Account", "Dashboard", "Logout"]}
			/>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
				crossOrigin="anonymous" />
			<Component {...pageProps} />  
		</>
	);
}

export default MyApp
