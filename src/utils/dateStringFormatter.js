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
 * Formátuje řetězec obsahující datum do předepsaného formátu.
 * Pokud je parametr `locale` nastaven na `true`, vrátí datum ve formátu specifickém pro Českou republiku.
 * V opačném případě vrátí datum ve formátu ISO (YYYY-MM-DD).
 *
 * @param {string} str - Vstupní řetězec s datem.
 * @param {boolean} [locale=false] - Určuje, zda se má použít lokální formátování.
 * @returns {string} Formátované datum jako řetězec.
 */
export const dateStringFormatter = (str, locale = false) => {
    const d = new Date(str);

    if (locale) {
        // Použije český lokální formát pro datum.
        return d.toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    // Získá jednotlivé složky data.
    const year = d.getFullYear();
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();

    // Formátuje datum do formátu YYYY-MM-DD.
    return [
        year,
        month.length < 2 ? "0" + month : month,
        day.length < 2 ? "0" + day : day,
    ].join("-");
};

export default dateStringFormatter;