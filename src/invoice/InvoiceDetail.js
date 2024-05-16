import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {apiGet} from "../utils/api";
import Country from "../persons/Country";
import { TransformCountry } from "../utils/helpers";
import dateStringFormatter from "../utils/dateStringFormatter";

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


    // Převedení názvů země pomocí pomocné metody TransormCountry která používá komponentu Country
    const sellerCountry = TransformCountry(invoice?.seller?.country);
    const buyerCountry = TransformCountry(invoice?.buyer?.country);

    //Vyrenderování pomocí JSX - detailu faktury 
    return (
        <div>
            <h1>Detail faktury: {invoice.invoiceNumber}</h1>
            <p><strong>Datum vystavení:</strong> {dateStringFormatter(invoice.issued, true)} <br />
               <strong>Datum splatnosti:</strong> {dateStringFormatter(invoice.dueDate, true)}
            </p>
            <hr />
            <div className="row">
                <div className="col">
                    <h3>Dodvatel</h3>
                    <p>{invoice?.seller?.name}<br/>
                    {invoice?.seller?.identificationNumber}<br/>
                    {invoice?.seller?.street} <br/> 
                    {invoice?.seller?.zip} {invoice?.seller?.city} <br/>
                    {sellerCountry}
                   </p>  
                </div>
                <div className="col">
                    <h3>Odběratel</h3>
                    <p>{invoice?.buyer?.name}<br/>
                    {invoice?.buyer?.identificationNumber}<br/>
                    {invoice?.buyer?.street} <br/> 
                    {invoice?.buyer?.zip} {invoice?.buyer?.city} <br/>
                    {buyerCountry}
                   </p>  
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col">
                    <h4>Položka</h4>
                    <p>{invoice.product}</p>
                </div>
                <div className="col">
                    <h4>Cena</h4>
                    <p>{invoice.price} Kč</p>
                </div>
            </div>
            <hr />
            <p><strong>Poznámka k faktuře:</strong> {invoice.note}</p>
            <hr />
            <br />
            <Link to={"/persons"} className="btn btn-info">
                Zpět
            </Link>
        </div>
    );
};

export default InvoiceDetail;
