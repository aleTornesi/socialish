import Link from 'next/link';
import Image from 'next/image'
import { ChangeEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import styles from '../styles/homePageMainContent.module.scss'
import Container from '@mui/material/Container';
import firebase, { auth, db } from '../firebaseConfig'
import Post from '../interfaces/Post';
import dayjs, { Dayjs } from 'dayjs';
import { AuthUserContext, IContext, useAuth } from '../context/userContext'
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface Props {
	user: User | null | undefined
}

export default () => {
	const [authUser, setAuthUser] = useState(auth.currentUser)
	//let authUser = auth.currentUser
	const [files, setFiles] = useState<FileList | null>(null)
	const textRef = useRef<TextFieldProps>(null)
	const imagesRef = useRef<HTMLInputElement>(null)

	auth.onAuthStateChanged((value) => setAuthUser(value))

    let list: Array<JSX.Element> = [];
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files.item(i)!);
            list.push(<Image src={url} layout="fill"/>);
        }
	}

	useEffect(() => console.log(textRef.current), [])
	
	const postOnClick = async () => {
		console.log(`uid: ${authUser?.uid}`)
		const userDocumentSnapshot = await db.collection('Users').doc(authUser?.uid).get()
		const userData = userDocumentSnapshot.data()
		const postDoc = db.collection('Posts').doc()

		console.log(textRef.current?.value)
		
		const userPost: Post = {
			id: postDoc.id,
			text: textRef.current?.value as string,
			image: [],
			createdAt: dayjs().toDate(),
			likesNumber: 0,
		};
		const post: Post = {
			...userPost,
			user: {
				uid: authUser!.uid,
				username: userData!.username
			}
		}
		console.log(userPost)

		postDoc.set(post)


		db.collection("Users").doc(authUser?.uid).collection("posts").doc(postDoc.id).set(userPost)
		db.collection('Users').doc(authUser?.uid).update({
			postsNumber: firebase.firestore.FieldValue.increment(1)
		})

		// db.collectionGroup('following')
		// 	.docs(authUser?.uid)
		// 	.get()
		// 	.then((query) => {
		// 		query.docs.forEach((doc) => {
		// 			let tmp = doc.data();
		// 			tmp.userPost.push(userPost)
		// 			doc.ref.update(tmp);
		// 		})		
		// 	});
	};

	return (
		<div>
			<Card sx={{width: '80vw', margin: 'auto', marginTop: '30px'}}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						New post
					</Typography>
					<TextField
						inputRef={textRef}
						sx={{
							marginY: '3vh'
						}}
						id="outlined-textarea"
						label="What's going on?"
						minRows={4}
						fullWidth
						multiline
					/>
					<Button variant="contained" component="label">
						Upload File
						<input type="file" ref={imagesRef} hidden />
					</Button>
				</CardContent>
				<CardActions sx={{
					justifyContent: 'end',
					marginX: '10vw'
				}}>
					<Box sx={{
						'& a, a:hover': {
							textDecoration: 'none',
							color: 'white',
						},

					}}>
						<Button onClick={postOnClick} variant="contained" size="small">
							<Link href={`/users/${authUser?.uid}`}>Post</Link>
						</Button>
					</Box>
				</CardActions>
			</Card>
			<Container></Container>
		</div>
	);
}
