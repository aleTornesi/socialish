import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next'
import { auth, db } from '../../firebaseConfig'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import { ParsedUrlQuery } from 'querystring'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import styles from '../../styles/user.module.scss'
import IPost from '../../interfaces/Post'
import FeaturedPost, {Props as FeaturePostProps} from '../../components/featurePost' 
import Post, {Props as PostProps} from '../../components/Post'
import { Box, Button, CircularProgress } from '@mui/material'
import Loading from '../../components/loading'
import dayjs from 'dayjs'
import IUser from '../../interfaces/User'
import Link from 'next/link'

export default () => {
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const [posts, setPosts] = useState<PostProps[] | undefined>(undefined)

    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            if (router.query.uid === undefined || Array.isArray(router.query.uid)) {
                router.push("/404")
                return
            }
    
            
            const uid: string = router.query.uid
            db.collection("Users").doc(router.query.uid).collection('posts').get()
            .then((value: firebase.firestore.QuerySnapshot) => {
                if(value.size == 0) return setPosts([])
                let posts: PostProps[] = []
                value.forEach((docSnapshot: firebase.firestore.QueryDocumentSnapshot) => {
                    const doc = docSnapshot.data()
                    db.collection('Posts').doc(docSnapshot.id).collection('likes').doc(auth.currentUser!.uid).get().then((likeDocSnapshot) => {
                        const post: PostProps = {
                            id: docSnapshot.id,
                            text: doc.text,
                            image: [],
                            createdAt: doc.createdAt.toDate(),
                            authUserAlreadyLiked: likeDocSnapshot.exists,
                            likesNumber: doc.likesNumber,
                        }
                        posts.push(post)
                        if (posts.length == value.size)
                            setPosts(posts)
                    })
                })
            })

            db.collection("Users").doc(router.query.uid).get().
                then((docSnapshot: firebase.firestore.DocumentSnapshot) => {
                    const docData: firebase.firestore.DocumentData | undefined = docSnapshot.data();
                    if (docSnapshot.exists) {
                        setUser({
                            uid: uid,
                            username: docData?.username,
                            firstName: docData?.firstName,
                            lastName: docData?.lastName,
                            birthDate: docData?.birthDate.toDate(),
                            bio: docData?.bio,
                            postsNumber: docData?.postsNumber,
                            followersNumber: docData?.followersNumber,
                            followingNumber: docData?.followingNumber
                        })
                    }
                    else {
                        router.push('/404')
                    }
                });
        }		
    }, [router.isReady])

    if (user === undefined)
        return <Loading />
    
    
    let postsComponent
    if (posts && posts.length > 0) {
        postsComponent = (
					<Grid container spacing={4} justifyContent="center">
                        {posts?.map((post: PostProps) =>                        
                            <Post
                                key={dayjs(post.createdAt).toISOString()}
                                user={user}
                                {...post}
                            />)    
						}
					</Grid>
				);
    }
    else {
        postsComponent =
            <Grid container margin={10}>
                <Grid item xs={10}>
                    <Paper sx={{padding: '5% 10%'}}>
                        <p style={{
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>This user has not posted yet</p>
                    </Paper>
                </Grid>
            </Grid>
    }
    return (
        <>
            <Grid container padding={10}>
                <Grid item xs={6}>
                    <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                    <Grid container>
                        <Grid item xs={3}>Posts: { user.postsNumber }</Grid>
                        <Grid item xs={3}>Followers: { user.followersNumber }</Grid>
                        <Grid item xs={3}>Following: { user.followingNumber }</Grid>
                    </Grid>
                    <Stack>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                        <p>{user.bio}</p>
                    </Stack>
                </Grid>
                    <Grid item xs={2}>
                        <Stack>
                            <Avatar className="avatar" src="../assets/images/Profile_avatar_placeholder_large.png" />
                            <Button>Follow</Button>
                        </Stack>
                    </Grid>
            </Grid>
            {postsComponent}
        </>
		);
}