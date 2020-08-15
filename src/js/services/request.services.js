export default class RequestService {
    static async postRequest(data, url) {
        try {
            const request = new Request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return _useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }
}

async function _useRequest(request) {
    const response = await fetch(request);
    return await response.json()
}