import { Link } from "react-router-dom";

function Header({title, cartItems}) {
	return (
		<div id="header">
			<h1>{title}</h1>
			<nav id="navbar">
				<ul>
					<li><Link to="/">Store</Link></li>
					<li><Link to="/cart">View Cart{cartItems ? ` (${cartItems})` : "" }</Link></li>
					<li><Link to="/admin">Admin</Link></li>
				</ul>
			</nav>
		</div>
	);
}

export default Header;
