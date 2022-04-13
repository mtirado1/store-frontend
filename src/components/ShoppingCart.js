
function CartItem({item, actions}) {
	const product = item.product;
	return (
		<div className="cart-item">
			<div className="details">
				<h3>{product.title}</h3>
				<img src={product.imageUrl}/>
				<p>{product.description}</p>
			</div>
			<div className="control">
				<button
					className="delete"
					onClick={() => actions.remove(product)}>
					Remove
				</button>
				<input 
					type="number"
					value={item.quantity}
					onInput={event => {actions.update(product, event.target.value)}}
				/>
			</div>
		</div>
	);
}

function ShoppingCart({cart, actions}) {
	if (cart.items.length === 0) {
		return <h2>There are no items in your cart</h2>;
	}

	function isCheckOutDisabled() {
		return cart.name === "" || cart.address === "";
	}

	return (
		<>
		<h2>Your Shopping Cart</h2>
		<div className="cart-list">
		{
			cart.items.map(item => <CartItem key={item.product._id} item={item} actions={actions}/>)
		}
		</div>
		<p>{cart.items.length} {cart.items.length === 1 ? "Product" : "Products"}</p>
		<p>{cart.totalItems} {cart.totalItems === 1 ? "Item" : "Items"}</p>
		<p>TOTAL: <span className="price">${cart.totalCost}</span></p>
		<h2>Deliver to</h2>
		<form>
			<h3>Name</h3>
			<input
				type="text"
				onChange={event => actions.updateName(event.target.value)}
				name="Name"
				value={cart.name}
			/>
			<h3>Address</h3>
			<input
				type="text"
				onChange={event => actions.updateAddress(event.target.value)}
				name="Address"
				value={cart.address}
			/>
			<p className="flex-row">
			<button
				type="button"
				disabled={isCheckOutDisabled()}
				onClick={actions.checkout}
			>Check Out</button>
			</p>
		</form>
		</>
	);
}

export default ShoppingCart;
