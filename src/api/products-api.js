import JSONRequest from './json-request'

const URL = "";

const productsApi = {
	getAll,
	create,
	delete,
	update
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

async function create(product) {
	try {
		const response = await jsonRequest.post("/products");
		if (response.status === 201) {
			return response.json();
		}
		return null;
	} catch(error) {
		console.log(error);
	}
}

async function delete(productId) {
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

export default productsApi;
