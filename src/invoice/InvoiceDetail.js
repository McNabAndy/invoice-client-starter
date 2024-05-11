import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "../persons/Country";

/**
 * Komponenta `InvoiceDetail` zobrazuje detailní informace o faktuře načtené z API.
 * Tato komponenta je navržena jako stránka detailu faktury v rámci větší aplikace.
 * 
 * @component
 * @example
 * return (
 *   <InvoiceDetail />
 * )
 */

const InvoiceDetail = () => {
    // Extrahuje ID z URL pomocí React Router hooku `useParams`.
    const {id} = useParams();
    // Lokální stav `invoice` pro ukládání načtených dat o faktuře.
    const [invoice, setInvoice] = useState({});

    // Effect hook pro načtení dat o faktuře z API při prvním renderování komponenty nebo změně ID.
    useEffect(() => {
        // API call, který získává data o faktuře podle ID a ukládá je do stavu.
        apiGet("/api/invoices/" + id)
        .then((data) => {setInvoice(data)});
    }, [id]); // Závislost na ID zajišťuje aktualizaci dat při změně ID v URL.

    //Vyrenderování pomocí JSX - detailu faktury 
    return (
        <div>
            <h1>Detail faktury: {invoice.invoiceNumber}</h1>
            <hr />
            <div className="row">
                <div className="col">
                    <h2>Dodvatel</h2>
                    <p>{invoice?.seller?.name}<br/>
                    {invoice?.seller?.identificationNumber}<br/>
                    {invoice?.seller?.country}
                   </p>  
                </div>
                <div className="col">
                    <h2>Odběratel</h2>
                    <p>{invoice?.buyer?.name}<br/>
                    {invoice?.buyer?.identificationNumber}<br/>
                    {invoice?.buyer?.country}
                   </p>  
                </div>
            </div>
            <hr />
            <h3>Položka</h3>
            <p>{invoice.product}</p>
            <hr />
            <h3>Cena</h3>
            <h3>{invoice.price}</h3> 
        </div>
    );
};

export default InvoiceDetail;
