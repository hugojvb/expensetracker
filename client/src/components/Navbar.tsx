import { FC, Fragment, useState, useContext } from "react";

import {
	makeStyles,
	Theme,
	createStyles,
	AppBar,
	Typography,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	withStyles,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import HistoryIcon from "@material-ui/icons/History";

import { Link } from "react-router-dom";

import Context from "../context/context";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		brand: {
			flexGrow: 1,
			marginLeft: 20,
			cursor: "pointer",
		},
		menu: {
			marginTop: "5vh",
		},
		link: {
			textDecoration: "none",
			color: "#444",
		},
	})
);

const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const Navbar: FC = (): JSX.Element => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const context = useContext(Context);

	const { logout } = context;

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		if (logout) {
			logout();
		}
	};

	return (
		<Fragment>
			<AppBar position="sticky" className={classes.root} color="primary">
				<Toolbar>
					<img src="/logo.png" alt="logo" height="40" width="50" onClick={() => (window.location.pathname = "/")} />
					<Typography variant="h6" className={classes.brand} onClick={() => (window.location.pathname = "/")}>
						Expense Tracker
					</Typography>

					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							elevation={4}
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							open={openMenu}
							onClose={handleCloseMenu}
							className={classes.menu}
						>
							<Link to="/home" className={classes.link}>
								<StyledMenuItem onClick={handleCloseMenu}>
									<ListItemIcon>
										<HomeIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="Home" />
								</StyledMenuItem>
							</Link>
							<Link to="/goals" className={classes.link}>
								<StyledMenuItem onClick={handleCloseMenu}>
									<ListItemIcon>
										<TrackChangesIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="Goals" />
								</StyledMenuItem>
							</Link>
							<Link to="/history" className={classes.link}>
								<StyledMenuItem onClick={handleCloseMenu}>
									<ListItemIcon>
										<HistoryIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="History" />
								</StyledMenuItem>
							</Link>
							<Link to="/login" className={classes.link} onClick={onLogout}>
								<StyledMenuItem onClick={handleCloseMenu}>
									<ListItemIcon>
										<ExitToAppIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</StyledMenuItem>
							</Link>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;
