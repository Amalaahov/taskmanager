import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import dashboard from "./../../assets/dashboard.png";
import addtask from "./../../assets/addtask.png";
import about from "./../../assets/about.png";
import logo from "./../../assets/logo.png";
import ModalAboutWindow from "./ModalAbout";
import { useState } from "react";

const Navbar = () => {
  const [modalWindows, setModalWindow] = useState(false);
  return (
    <div className={classes.Navbar}>
      <img src={logo} alt="logo" /> 
      <div className={classes.stickyLink}>
        <div className={classes.linkdiv}>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.links}
            exact
            to="/"
          >
            <img src={dashboard} alt="dashboard" /> Dashboard
          </NavLink>
        </div>
        <div className={classes.linkdiv}>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.links}
            to="/addtask"
          >
            <img src={addtask} alt="dashboard" /> Add task
          </NavLink>
          <div  className={classes.links} onClick={() => setModalWindow(true)}> <img src={about} alt="about" />About</div>
          <ModalAboutWindow
            
            setActive={setModalWindow}
            isOpened={modalWindows}
          />
        </div>

      </div>
      
    </div>
  );
};
export default Navbar;
