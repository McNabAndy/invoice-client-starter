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
    
    //Vyrenderování pomocí JSX
    return(
        <div>
            <h1>Statistiky faktur</h1>
                <hr/>
                <table className="table table-bordered table table-hover">
                <thead className="table-primary">
                <tr>
                    <th>Součet cen v aktuáním roce</th>
                    <th>Celkový součet cen</th>
                    <th>Počet faktur v databázi</th> 
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{statistics.currentYearSum}</td>
                    <td>{statistics.allTimeSum}</td>
                    <td>{statistics.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
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

    //Vyrenderování pomocí JSX
    return(
        <div>
        <h1>Statistiky osob</h1>
        <p className="text-danger">*Přehled osob jejichž výnos je větší jak 0</p>  
        <hr/>
        <table className="table table-bordered table table-hover">
                <thead className="table-primary">
                <tr>
                    <th>ID v databázi</th>
                    <th>Jméno</th>
                    <th>Výnosy</th>
                </tr>
                </thead>
                <tbody>
                {statistics.map((item, index) => (
                    item.revenue > 0 ?(
                        <tr key={index + 1}>
                        <td>{item.personId}</td>
                        <td>{item.personName}</td>
                        <td>{item.revenue}</td>
                    </tr>
                    ) : null
                    
                ))}
                </tbody>
            </table>
            
        </div>
    )
}