
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

function ShoppingCart({items, actions}) {
	if (items.length === 0) {
		return <h2>There are no items in your cart</h2>;
	}
	return (
		<>
		<h2>Your Shopping Cart</h2>
		<div className="cart-list">
		{
			items.map(item => <CartItem key={item.product._id} item={item} actions={actions}/>)
		}
		</div>
		</>
	);
}

export default ShoppingCart;
