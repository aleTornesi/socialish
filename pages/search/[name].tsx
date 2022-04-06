import { Grid } from "@mui/material";
import { Main } from "next/document";
import FeaturedPost from "../../components/featurePost";
import Header from "../../components/header"
import {Props as FeaturePostProps} from '../../components/featurePost'
import { useEffect, useState } from "react";
import firebase from '../../firebaseConfig'
import { useRouter } from "next/router";
import styles from '../../styles/search.module.scss'

export default () => {
    //let featuredPosts: FeaturePostProps[] | undefined;
    const [featuredPosts, setFeaturedPosts] = useState<FeaturePostProps[] | undefined>(undefined)
    const router = useRouter()
    
    useEffect(() => {
        if (router.isReady) {
            const name: string | string[] | undefined = router.query.name
            if (name === undefined) {
                router.push('/')
                return;
            }
        
            let maxSearchString: string = nextCharAt(name.toString(), name.length - 1)
            firebase.firestore().collection('Users')
                .where("username", ">=", name)
                .where("username", "<", maxSearchString)
                .get()
                .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                    let users: FeaturePostProps[] = []
                    snapshot.forEach((result: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
                        const document = result.data() ?? {}
                        users.push({
                            uid: document.uid,
                            title: document.username,
                            description: `${document.name} ${document.lastName}`,
                            //date: document.birthDate.toDate(),
                            image: document.image
                        })
                    })
                    setFeaturedPosts(users)
                })
        }
    }, [router.isReady])
    
    
    return (
			<main className={styles.root}>
				<Grid container spacing={4} justifyContent="center">
					{featuredPosts?.map((post: FeaturePostProps) => (
                        <FeaturedPost key={post.title} {...post} />
					))}
				</Grid>
			</main>
		);
}

function nextCharAt(string: string, index: number) {
	if (index >= string.length) {
		return string.valueOf();
    }
    
    const nextChar = String.fromCharCode(string.charCodeAt(index)+1)

	return string.substring(0, index) + nextChar + string.substring(index + 1);
};