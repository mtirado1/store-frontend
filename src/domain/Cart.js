function bound(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

class Cart {
	constructor(items = []) {
		this.items = items;
	}

	clear() {
		this.items = [];
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
		return this.items.reduce((total, item) => item.quantity, 0);
	}

	get totalCost() {
		return this.items.reduce(
			(total, item) => total + item.product.cost * item.quantity, 0
		);
	}
}

export default Cart;
