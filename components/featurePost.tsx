import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

export interface Props {
	uid: string,
    title: string,
    //date: Date,
    description: string,
    image: string
}

function FeaturedPost({uid, title, description, image}: Props) {

	return (
		<Grid item xs={12} md={6}>
			<Link href={`/users/${uid}`}>
				<CardActionArea>
					<Card sx={{ display: "flex" }}>
						<CardContent sx={{ flex: 1 }}>
							<Typography component="h2" variant="h5">
								{title}
							</Typography>
							<Typography variant="subtitle1" paragraph>
								{description}
							</Typography>
							<Typography variant="subtitle1" color="primary">
								Continue reading...
							</Typography>
						</CardContent>
						<CardMedia
							component="img"
							sx={{ width: 160, display: { xs: "none", sm: "block" } }}
							image={image ?? "../assets/images/Profile_avatar_placeholder_large.png"}
							alt="Profile picture"
						/>
					</Card>
				</CardActionArea>
			</Link>
		</Grid>
	);
}

export default FeaturedPost;
