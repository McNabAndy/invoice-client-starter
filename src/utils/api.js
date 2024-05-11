/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

/**
 * Základní URL adresa API serveru.
 */
const API_URL = "http://localhost:8080";

/**
 * Základní funkce pro načítání dat z API.
 * @param {string} url Cílová URL adresa, ke které se připojuje.
 * @param {Object} requestOptions Konfigurační objekt pro fetch požadavek.
 * @returns {Promise} Promise objekt, který představuje odpověď od serveru.
 */
const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            if (requestOptions.method !== 'DELETE')
                return response.json();
        })
        .catch((error) => {
            throw error;
        });
};


/**
 * Načítá data pomocí GET metody.
 * @param {string} url URL cesta k zdroji.
 * @param {Object} params Parametry pro GET požadavek.
 * @returns {Promise} Promise objekt s daty.
 */
export const apiGet = (url, params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};


/**
 * Odesílá data pomocí POST metody.
 * @param {string} url URL cesta k zdroji.
 * @param {Object} data Data k odeslání.
 * @returns {Promise} Promise objekt s odpovědí serveru.
 */
export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};


/**
 * Aktualizuje data pomocí PUT metody.
 * @param {string} url URL cesta k zdroji.
 * @param {Object} data Data pro aktualizaci.
 * @returns {Promise} Promise objekt s odpovědí serveru.
 */
export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};


/**
 * Maže data pomocí DELETE metody.
 * @param {string} url URL cesta k zdroji.
 * @returns {Promise} Promise objekt reprezentující stav operace.
 */
export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
    };

    return fetchData(url, requestOptions);
};
