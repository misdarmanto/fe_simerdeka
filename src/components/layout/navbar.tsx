import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import IconImage from "../../assets/icon.png";

const NavbarStyle = () => {
	return (
		<Navbar fluid={true} rounded={true}>
			<Navbar.Brand>
				<img src={IconImage} className="mr-3 h-6 sm:h-9" alt="Mbadok Logo" />
				<span className="self-center whitespace-nowrap text-xl font-semibold">Mbadok</span>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Link to={"/"}>
					<Navbar.Link>Home</Navbar.Link>
				</Link>
				<Link to={"/menu"}>
					<Navbar.Link>Menu</Navbar.Link>
				</Link>
				<Link to={"/about"}>
					<Navbar.Link>About</Navbar.Link>
				</Link>
				<Link to={"/contact"}>
					<Navbar.Link>Contact</Navbar.Link>
				</Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarStyle;
