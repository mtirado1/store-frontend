import JSONRequest from './json-request'

const URL = "http://localhost:2400";

const productsApi = {
	getAll,
	getOne,
	create,
	remove,
	update,
	order
};

const jsonRequest = new JSONRequest(URL);

async function getAll() {
	try {
		const response = await jsonRequest.get("/products");
		if (response.status === 200) {
			return response.json();
		}
		return null;
	} catch(error) {
		console.log(error);
	}
}

async function getOne(productId) {
	try {
		const response = await jsonRequest.get("/products/" + productId);
		if (response.status === 200) {
			return response.json();
		}
		return null;
	} catch(error) {
		console.log(error);
	}
}

async function create(product) {
	try {
		const response = await jsonRequest.post("/products", product);
		if (response.status === 201) {
			return response.json();
		}
		return null;
	} catch(error) {
		console.log(error);
	}
}

async function remove(productId) {
	try {
		const response = await jsonRequest.delete("/products/" + productId);
		return (response.status === 204);
	} catch(error) {
		console.log(error);
	}
}

async function update(productId, product) {
	try {
		const response = await jsonRequest.put("/products/" + productId, product);
		return response.json();
	} catch(error) {
		console.log(error);
	}
}

async function order(shoppingCart) {
	try {
		const response = await jsonRequest.post("/orders", shoppingCart);
		if (response.status === 201) {
			return response.json();
		} else {
			return null;
		}
	} catch(error) {
		console.log(error);
	}
}

export default productsApi;
