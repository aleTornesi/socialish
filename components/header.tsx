import Image from "next/image";
import styles from '../styles/header.module.scss'
import logo from "../images/Screenshot_2022-03-10_at_2.10.36_PM-removebg-preview.png";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Search } from "@mui/icons-material";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Script from "next/script";
import Searchbar from './searchBar/searchBar'
import Link from "next/link";
import { Autocomplete, TextField } from "@mui/material";
import { width } from "@mui/system";

interface Props {
	pages: string[],
	settings: string[]
}

const ResponsiveAppBar = ({pages, settings}: Props) => {
	const [anchorElementNav, setAnchorElementNav] = React.useState<null | HTMLElement>(null);
	const [anchorElementUser, setAnchorElementUser] = React.useState<null | HTMLElement>(null);
	const array: string[] = ["ajeje", "brazorf"]

	

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElementNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElementUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link href="/">
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontWeight: "bold",
								'&:hover': {
									cursor: 'pointer'
								}
							}}>
							
								Socialish
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElementNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElementNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{pages.map((page: string) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}></Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page: string) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}>
								{page}
							</Button>
						))}
						<Searchbar hints={array} />
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElementUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElementUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting: string) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;