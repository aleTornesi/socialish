import React, { useState } from "react";
import styles from '../../styles/searchbar.module.scss'
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import router from "next/router";

interface Props {
	hints: string[]
}

export default ({ hints }: Props) => {
	const [query, setQuery] = useState<string>("")

	return (
		<>
			<Autocomplete
				id="free-solo-demo"
				sx={{ width: "30%" }}
				freeSolo
				options={hints}
				renderInput={(params) => (
					<TextField
						placeholder="Search"
						sx={{
							width: { sm: 250, md: 350 },

							"& .MuiOutlinedInput-root": {
								marginTop: "3%",
								marginBottom: "3%",
								color: "white",
								"& > fieldset": {
									borderColor: "white",
								},
								"& > fieldset:focus": {
									borderColor: "white",
								},
								"&::placeholder": {
									color: "white",
								},
							},

							"& .MuiOutlinedInput-root:hover": {
								"& > fieldset": {
									borderColor: "white",
								},
							},
						}}
						{...params}
						variant="outlined"
						onChange={(event) => {
							setQuery(event.target.value)
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								router.push(`/search/${query}`);
								setQuery("")
								return;
							}
						}}
					/>
				)}
			/>
			<IconButton
				color="inherit"
				component="span"
				onClick={() => {
					router.push(`/search/${query}`)
					setQuery("")
				}
				}>
				<SearchIcon />
			</IconButton>
		</>
	);
};
