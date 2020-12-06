export default class Api {
  constructor(baseUrl, headers = {}, config) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    for (let [k, v] of Object.entries(config)) {
      this[k] = async (params, body) => await this._query(v.path, v.method, params, body);
    }
  }

  async _query(path, method, params, body) {
    let calculatedPath = path;
    let paramStr = '';
    const paramsParts = [];
    if (params) {
      for (let [k, v] of Object.entries(params)) {
        if (calculatedPath.indexOf(`:${k}`) > -1) {
          calculatedPath = calculatedPath.replace(`:${k}`, v);
        } else {
          paramsParts.push(`${k}=${v}`);
        }
      }

      if (paramsParts.length) {
        paramStr = `?${paramsParts.join('&')}`;
      }
    }

    const url = `${this._baseUrl}${calculatedPath}${paramStr}`;
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
