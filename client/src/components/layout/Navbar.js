import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const Navbar = (props) =>{
    return(
        // <nav>
        //     <div class="nav-wrapper">
        //         <a href="#" class="brand-logo">Dream Arena</a>
        //         <ul id="nav-mobile" class="right hide-on-med-and-down">
        //             <li><Link to='/upcoming'>Upcoming</Link></li>
        //         </ul>
        //     </div>
        // </nav>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
Navbar.defaultProps={
    title:'Dream Arena',
};
Navbar.propTypes={
    title:PropTypes.string.isRequired,
    // icon:PropTypes.string.isRequired

};

export default Navbar