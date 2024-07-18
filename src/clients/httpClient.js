import https from 'https';
import { StringDecoder } from 'string_decoder';
import { oauth } from '../config/constants';

export const httpClient = (path, postData) => {
	try {
		return new Promise((resolve, reject) => {
			const options = {
				hostname: oauth.url,
				port: 443,
				family: 6,
				path: path,
				method: 'POST',
				headers: {
					'Accept': "application/json",
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent': oauth.userAgent,
					"__youtube_oauth__": true,
				},
				rejectUnauthorized: false,
			};

			const req = https.request(options, (res) => {
				const decoder = new StringDecoder('utf8');
				let responseData = '';

				res.on('data', (chunk) => {
					responseData += decoder.write(chunk);
				});

				res.on('end', () => {
					responseData += decoder.end();
					if (res.statusCode !== 200 && res.statusCode !== 428) {
						reject(new Error(`Error Status Code: ${res.statusCode}`));
						return;
					}

					try {
						const jsonData = JSON.parse(responseData);
						resolve(jsonData);
					} catch (error) {
						reject(new Error(`Error while parsing JSON-Response: ${error.message}`));
					}
				});
			});

			req.on('error', (err) => {
				reject(err);
			});

			if (postData) {
				const formData = new URLSearchParams();
				Object.entries(postData).forEach(([key, value]) => {
					formData.append(key, value);
				});
				req.write(formData.toString());
			}

			req.end();
		});

	} catch (error) {
		throw new Error(`Error: ${error.message}`);
	}
}