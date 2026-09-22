import { Link} from "react-router-dom";

import SelfLoveBombWithTextImage from "./SelfLoveBombWithTextImage.jsx";

const NavBar = () => {
  return (
    <nav>
    <div className = "navbar">
      <ul>
        <li><Link to="/">You're Home</Link></li>
        <li><Link to="/AboutPage">About Self Love Bombs</Link></li>
        <li><Link to="/CheckInPage">Let's Check In</Link></li>
        <li><Link to="/CreateYourOwnPage">Create Your Own Love Bomb</Link></li>
        <li><Link to="/PetLoveBombPage">Pet Love Bombs</Link></li>
        <li><Link to="/CreateUserPage">Create a User</Link></li>
      </ul>
    </div>   
    </nav>
  );
};

export default NavBar;