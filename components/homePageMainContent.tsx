import Link from 'next/link';
import Image from 'next/image'
import { ChangeEvent, useState } from 'react';
import styles from '../styles/homePageMainContent.module.scss'
import Container from '@mui/material/Container';
import firebase, { auth } from '../firebaseConfig'

export default () => {
    const [files, setFiles] = useState<FileList | null>(null)

    let list: Array<JSX.Element> = [];
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files.item(i)!);
            list.push(<Image src={url} layout="fill"/>);
        }
	}
	



	return (
		<div className={styles.root}>
			<form>
				<div className="card card-body">
					<div className="card-title">
						<p className="fw-bold">New post</p>
					</div>
					<div className="subtitle mb-3">
						<textarea
							placeholder="Text..."
							name="text-content"
							cols={30}
							rows={10}
							className="form-control"
                        ></textarea>
					</div>
					<div className="mb-3">
						<input
							className="form-control"
							accept="image/*"
							type="file"
							id="formFileMultiple"
							multiple
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setFiles(e.currentTarget.files);
							}}
						/>
					</div>
					<div className={`${styles.images}`}>{list}</div>
					<div className="text-end">
						{/*<input className="btn btn-primary" type="submit" value="Post" />*/}
						<button className={`btn btn-primary ${styles.link}`} onClick={postOnClick}>
							<Link href={""}>Post</Link>
						</button>
					</div>
				</div>
			</form>
			<Container>
				
			</Container>
		</div>
		);


}

const postOnClick = async () => {
	const snapshot = firebase.firestore().
		collection('Users').
		doc(auth.currentUser?.uid).
		collection(`${auth.currentUser}Posts`).
		doc().set({
			text: ""
		})
}