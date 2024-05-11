import {apiGet} from "../utils/api";
import React, {useEffect, useState} from "react";

/**
 * Komponenta zobrazuje statistiky faktur, včetně celkového součtu cen za aktuální rok, 
 * celkový součet cen za všechny roky a celkový počet faktur.
 * 
 * Statistiky se načítají z API při prvním načtení komponenty.
 * 
 * @returns {JSX.Element} Komponenta zobrazující statistiky faktur.
 */

export const InvoicesStatistic= () => {


    // Stav pro sledování sttistických dat
    const [statistics, setStatistic] = useState({
        currentYearSum: 0,
        allTimeSum: 0,
        invoicesCount: 0,
    });
    
    // Načtení stattistických dat při prvním načtení komponenty
    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStatistic(data));
    }, []);

    return(
        <div>
            <h1>Statistiky faktur</h1>
                <hr/>
                <p>
                    <strong>Součet cen v aktuáním roce:</strong>
                    <br/>
                    {statistics.currentYearSum}
                </p>
                <p>
                    <strong>Celkový součet cen :</strong>
                    <br/>
                    {statistics.allTimeSum}
                </p>
                <p>
                    <strong>Počet faktur v databázy:</strong>
                    <br/>
                    {statistics.invoicesCount}
                </p>
        </div>
    )

}

export const PersonStatistic= () => {

    // Stav pro sledování sttistických dat, endpoint mi vrací pole
    const [statistics, setStatistic] = useState([]);
    
    // Načtení stattistických dat při prvním načtení komponenty
    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setStatistic(data));
    }, []);

    return(
        <div>
        <h1>Statistiky osob</h1>
        <hr/>
        <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID v databázy</th>
                    <th>Jméno</th>
                    <th>Výnosy</th>
                </tr>
                </thead>
                <tbody>
                {statistics.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{item.personId}</td>
                        <td>{item.personName}</td>
                        <td>{item.revenue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}