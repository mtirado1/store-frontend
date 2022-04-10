class JSONRequest {
	constructor(url, headers = {}) {
		this.url = url;
		this.headers = headers;
		this.headers["Content-Type"] = "application/json";
	}

	async run(path, method = "GET", body = null) {
		const params = {
			method: method,
			headers: this.headers
		}
		if (body !== null) {
			params.body = JSON.stringify(body);
		}
		return await fetch(this.url + path, params);
	}

	async get(path, body = null) {
		return this.run(path, "GET", body);
	}

	async post(path, body = null) {
		return this.run(path, "POST", body);
	}

	async put(path, body = null) {
		return this.run(path, "PUT", body);
	}

	async delete(path, body = null) {
		return this.run(path, "DELETE", body);
	}
}

export default JSONRequest;
