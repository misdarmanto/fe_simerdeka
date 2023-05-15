import { Footer } from "flowbite-react";
import { BsFacebook, BsTiktok, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "../../assets/icon.png";

const FooterStyle = () => {
	return (
		<Footer container={true}>
			<div className="w-full pt-10">
				<div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					<div>
						<Footer.Brand href="/" src={Logo} alt="Logo" name="Mbadok" />
					</div>
					<div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
						<div>
							<Footer.Title title="about" />
							<Footer.LinkGroup col={true}>
								<Footer.Link href="#">Mbadok</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Follow us" />
							<Footer.LinkGroup col={true}>
								<Footer.Link href="#">Instagram</Footer.Link>
								<Footer.Link href="#">Tiktok</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Legal" />
							<Footer.LinkGroup col={true}>
								<Footer.Link href="#">Privacy Policy</Footer.Link>
								<Footer.Link href="#">Terms & Conditions</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<Footer.Copyright href="#" by="Mbadok™" year={2023} />
					<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
						<Footer.Icon href="#" icon={BsTiktok} />
						<Footer.Icon href="#" icon={BsFacebook} />
						<Footer.Icon href="#" icon={BsInstagram} />
						<Footer.Icon href="#" icon={BsTwitter} />
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterStyle;
