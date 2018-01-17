

export const baseApi = 'http://localhost:9001/';

export const handleApiResponse = (api: string, resolve: any, reject: any, method: string = 'GET', body: string = '') => {
	fetch(baseApi + api, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body
	}).then((response) => {
		// Resolve promise as string which contains API result to be manipulated in the callback
		response.json().then((jsonData) => {
			if (!response.ok) {
				// Reject and return bad request or not found DbError
				reject(jsonData.error);
			} else {
				// Resolve and return data in JSON format
				resolve(jsonData);
			}
		}).catch(() => {
			reject(400); // bad request
		});
	}).catch(() => {
		reject(503); // connection refused / no response
	});
}
