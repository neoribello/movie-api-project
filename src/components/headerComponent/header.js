import React, {  Component } from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Home } from "@material-ui/icons"

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
  });

const navLinks = [
    { title: `about us`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` },
]

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
    <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
            </IconButton>

            <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
            >
                {navLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}  >
                <ListItem button>
                    <ListItemText primary={title} />
                </ListItem>
                </a>
                ))}
            </List>
        </Toolbar>
    </Container>
    </AppBar>
  )
}
export default Header
