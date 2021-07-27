import classes from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import dashboard from './../../assets/dashboard.png';
import addtask from './../../assets/addtask.png';
import logo from './../../assets/logo.png'

const Navbar = () => {
    return (
        <div className={classes.Navbar}>
            <img src={logo} alt='logo' />
            <div className={classes.stickyLink}>
                <div className={classes.linkdiv}><NavLink activeClassName={classes.activeLink} className={classes.links} exact to="/"><img src={dashboard} alt='dashboard' /> Dashboard</NavLink></div>
                <div className={classes.linkdiv}><NavLink activeClassName={classes.activeLink} className={classes.links} to="/addtask"><img src={addtask} alt='dashboard' /> Add task</NavLink></div>
            </div>
        </div>
    )
}
export default Navbar;