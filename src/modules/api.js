export default class Api {
  constructor(baseUrl, headers, config) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    for (let [k, v] of Object.entries(config)) {
      this[k] = async (params, body) => await this._query(v.path, v.method, params, body);
    }
  }

  async _query(path, method, params, body) {
    let paramStr = '';
    if (params) {
      const paramsParts = [];
      for (let [k, v] of Object.entries(params)) {
        paramsParts.push(`${k}=${v}`);
      }
      paramStr = `?${paramsParts.join('&')}`;
    }

    const url = `${this._baseUrl}/${path}${paramStr}`;
    const options = {
      method: method,
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`При запросе ${url}, сервер вернул ошибку: ${response.status}`);
    }
    return await response.json();
  }
}
