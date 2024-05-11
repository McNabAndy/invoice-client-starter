import React, {useEffect, useState} from "react";
import {apiGet, apiDelete} from "../utils/api"; 
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

/**
 * Hlavní komponenta pro zobrazení seznamu faktur.
 * Poskytuje funkce pro filtraci a mazání faktur.
 * Načítá a zobrazuje faktury podle zadaných filtrů.
 *
 * @returns {JSX.Element} Komponenta, která zobrazuje seznam faktur a filtr.
 */

const InvoiceIndex = () => {

     // Stav pro seznam osob pro výběr v filtru
    const [personsListState, setPersonsList] = useState([]);
    // Stav pro ukládání filtrů
    const [filterState, setFilterState] = useState({
        buyerId : undefined,
        sellerId : undefined,
        product : undefined,
        minPrice : undefined,
        maxPrice : undefined,
        limi : undefined,
    })
    // Stav pro seznam faktur
    const [invoices, setInvoices] = useState([]);


    /**
     * Mazání faktury pomocí API a aktualizace stavu.
     * @param {string} id Identifikátor faktury, která má být smazána.
     */
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };


    // Načtení seznamu faktur a osob při prvním načtení komponenty
    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersonsList(data));
    }, []);



    /**
     * Zpracování změn ve filtrech.
     * Nastaví stav filtru na undefined pro prázdné hodnoty nebo na aktuální hodnotu.
     * @param {React.ChangeEvent<HTMLInputElement>} e Událost změny vstupu.
     */
    const handleChange = (e) => {
        // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilterState(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilterState(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };



     /**
     * Odeslání formuláře a načtení faktur podle zadaných filtrů.
     * @param {React.FormEvent<HTMLFormElement>} e Událost odeslání formuláře.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
    
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };


    //Vyrenderování pomocí JSX
    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter 
                handleChange={handleChange}
                handleSubmit ={handleSubmit}
                personList = {personsListState}
                filter = {filterState}
                confirm="Filtrovat Faktury"
            />
            <hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;