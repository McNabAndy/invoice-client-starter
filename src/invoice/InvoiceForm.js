import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import InputSelect from "../components/InputSelect";

import FlashMessage from "../components/FlashMessage";

import Country from "../persons/Country";
/**
 * Formulář pro vytvoření nebo úpravu faktury.
 * Umožňuje uživatelům zadat nebo upravit údaje o faktuře.
 * Po úspěšném odeslání přesměruje uživatele na seznam faktur.
 *
 * @returns {JSX.Element} JSX element reprezentující formulář pro vytvoření nebo úpravu faktury.
 */

const InvoiceForm = () => {
    const navigate = useNavigate();

    // Extrahuje ID z URL pomocí React Router hooku `useParams`.
    const {id} = useParams();

    // Stav pro ukládání seznamu osob a detailů faktury
    const [personListState, setPersonList] = useState([]);
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        seller: { _id: ""},
        buyer: {_id: ""},    
    });

    // Stav pro sledování odeslání a výsledku operace
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);


    /**
     * Načítá seznam osob a, pokud existuje id, načítá detaily faktury.
     * Závisí na změně id, aby se přizpůsobila aktualizacím faktury.
     */
    useEffect(() => {
        apiGet('/api/persons').then((data) => setPersonList(data));
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]); // Závislost na ID zajišťuje aktualizaci dat při změně ID v URL.


    /**
     * Ošetřuje odeslání formuláře. Zpracuje vytvoření nebo aktualizaci faktury.
     * Po úspěšném odeslání přesměruje uživatele na stránku se seznamem faktur.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - Událost odeslání formuláře
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };


    const sent = sentState;
    const success = successState;

    //Vyrenderování pomocí JSX
    return(
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} Fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date" 
                    name="issued"
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení ve tvaru DD.MM.YYYY"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"  
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti ve tvaru DD.MM.YYYY"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />  

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    min="1"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="price"
                    min="1"
                    label="Cena"
                    prompt="Zadejte cenu produktu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="3"
                    label="Poznámka"
                    prompt="Zadejte Poznámku k faktuře"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

                <InputSelect
                    name="seller"
                    items={personListState}
                    label="Dodavetel"
                    prompt="Vyberte dodavatele"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller: {_id: e.target.value}});
                    }}
                />

                <InputSelect
                    name="seller"
                    items={personListState}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer: {_id: e.target.value}});
                    }}
                />

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    )


}

export default InvoiceForm;