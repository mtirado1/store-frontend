import JSONRequest from './json-request'

const URL = "";

const ordersApi = { create };

const jsonRequest = new JSONRequest(URL);

async function create(order) {
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

export default ordersApi;
