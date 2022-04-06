import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Avatar, Box, Button, CardActionArea, CardActions, Grid, IconButton} from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IPost from '../interfaces/Post';
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from 'react';
import firebase, { db, auth }  from '../firebaseConfig';
import dayjs from 'dayjs';

export interface Props extends IPost {
	authUserAlreadyLiked: boolean
}

export default ({ id, text, image, createdAt, user, likesNumber, authUserAlreadyLiked }: Props) => {

	const [isLiked, setIsLiked] = useState<boolean>(authUserAlreadyLiked)

	return (
		<Card
			sx={{
				minWidth: 200,
				minHeight: 300,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}>
			<CardActionArea>
				<Box sx={{
					'& a': {
						textDecoration: 'none',
						color: 'white'
					}
				}}>
					<Link href={`/users/${user!.uid}`}>
						<Grid container sx={{alignItems: 'center', justifyContent: 'space-between',  paddingX: '30px'}}>
								<Grid item xs={8}>
									<Typography variant="h5" color="text.primary">
										{user!.username}
									</Typography>
								
							</Grid>
							<Grid item xs={1} sx={{height: 'fit-content'}}>
								<Avatar
									className="avatar"
									src="../assets/images/Profile_avatar_placeholder_large.png"
								/>
								</Grid>
						</Grid>
					</Link>
				</Box>
			</CardActionArea>
			<div style={{ height: "100%" }}>
				{image.length > 0 &&
					image.map((value) => (
						<CardMedia
							component="img"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							alt="green iguana"
						/>
					))}
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{text}
					</Typography>
				</CardContent>
			</div>
			<CardActions sx={{justifyContent: 'end'}}>
				<IconButton onClick={
					async () => {
						console.log(`db.collection('Posts').doc(${id}).collection('likes').doc(${auth.currentUser!.uid})`)
						if (isLiked) {
							try {
								await db.runTransaction(
									async (t) => {
										const doc = await t.get(db.collection('Posts').doc(id).collection('likes').doc(auth.currentUser!.uid))
										console.log(doc.exists)
										if (doc.exists) {
											t.delete(doc.ref)
											t.update(
												db.collection('Users').doc(user!.uid).collection('posts').doc(id),
												{likesNumber: firebase.firestore.FieldValue.increment(-1),}
											);
										}
									}
								)
								setIsLiked(false)
							} catch (e) {
								console.log(e)
							}
						} else {
							try {
								await db.runTransaction(
									async (t) => {
										console.log(auth.currentUser)
										const doc = await t.get(
											db.collection("Posts")
												.doc(id)
												.collection("likes")
												.doc(auth.currentUser!.uid)
										);
										console.log(doc)
										console.log(doc.exists)
										if (!doc.exists) {
											t.set(
												doc.ref,
												{ date: dayjs().toDate() }
											);
											t.update(
												db.collection("Users")
													.doc(user!.uid)
													.collection("posts")
													.doc(id),
												{ likesNumber: firebase.firestore.FieldValue.increment(1) }
											)
										}
									}
								)
								setIsLiked(true)
							} catch (error) {
								console.log(error)
							}
						}
					}
				}>
					{ isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
				</IconButton>
				<IconButton>
					<CommentIcon />
				</IconButton>
				<IconButton>
					<ShareIcon />
				</IconButton>
			</CardActions>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{likesNumber} likes
				</Typography>
			</CardContent>
			<CardContent>
				<Typography variant="body2">{createdAt.toLocaleString()}</Typography>
			</CardContent>
		</Card>
	);
};