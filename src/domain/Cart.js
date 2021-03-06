function bound(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

class Cart {
	constructor(items = [], name = "", address = "") {
		this.name = name;
		this.address = address;
		this.items = items;
	}

	clear() {
		this.items = [];
		this.name = "";
		this.address = "";
	}

	update(product, quantity) {
		const id = product._id;
		let existing = this.items.find(i => i.product._id === id);
		if (existing === undefined) return;
		existing.quantity = bound(quantity, 1, 10);
	}

	add(product, quantity = 1) {
		const id = product._id;
		let existing = this.items.find(i => i.product._id === id);
		if (existing === undefined) {
			this.items.push({
				product: product,
				quantity: bound(quantity, 1, 10)
			});
		} else {
			existing.quantity = bound(existing.quantity + quantity, 1, 10);
		}
	}

	remove(product) {
		const id = product._id;
		const index = this.items.findIndex(i => i.product._id === id);
		if (index === -1) return;
		this.items.splice(index, 1);
	}

	get totalItems() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}

	get totalCost() {
		return this.items.reduce(
			(total, item) => total + item.product.price * item.quantity, 0
		);
	}

	makeOrderRequest() {
		return {
			customer: {
				name: this.name,
				address: this.address
			},
			products: this.items.map(item => {
				return {
					productId: item.product._id,
					quantity: item.quantity
				};
			})
		};
	}
}

export default Cart;
