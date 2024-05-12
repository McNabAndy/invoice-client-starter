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

import React from "react";
import {Link} from "react-router-dom";
/**
 * Komponenta PersonTable zobrazuje tabulku osob s akčními tlačítky pro každou osobu.
 * Každý řádek tabulky obsahuje jméno osoby a skupinu tlačítek pro správu osobních údajů.
 * Umožňuje uživatelům procházet, upravovat nebo odstraňovat záznamy osob.
 *
 * @param {Object} props - Vlastnosti komponenty.
 * @param {string} props.label - Nadpis, který se zobrazí nad tabulkou.
 * @param {Array} props.items - Seznam osob, které mají být zobrazeny v tabulce.
 * @param {Function} props.deletePerson - Funkce volaná pro odstranění osoby.
 * @returns {JSX.Element} Element zobrazující tabulku osob s možnostmi správy.
 */

const PersonTable = ({label, items, deletePerson}) => {
    //Vyrenderování pomocí JSX
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered bordered table table-hover">
                <thead className="table-primary">
                <tr>
                    <th className="col-sm-1">#</th>
                    <th>Jméno</th>
                    <th className="col-sm-3" colSpan={3}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td >
                            <div className="btn-group" style={{ width: '100%', display: 'flex'  }}>
                                <Link
                                    to={"/persons/show/" + item._id}
                                    className="btn btn-sm btn-info me-2"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/persons/edit/" + item._id}
                                    className="btn btn-sm btn-warning me-2"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deletePerson(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/persons/create"} className="btn btn-success me-2">
                Nová osoba
            </Link>

            <Link to={"/persons/show/statistics"} className="btn btn-info">
                Statistiky
            </Link>
        </div>
    );
};

export default PersonTable;
