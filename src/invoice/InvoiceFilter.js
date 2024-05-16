import React from "react";

import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

/**
 * Komponenta InvoiceFilter poskytuje formulář pro filtrování faktur podle různých kritérií.
 * Umožňuje uživatelům zadat filtr pro vyhledávání faktur na základě ID odběratele, ID dodavatele,
 * počtu faktur k vypsání, maximální a minimální částky, a produktu.
 *
 * @component
 * @param {Object} props - Vlastnosti předávané do komponenty
 * @param {Function} props.handleChange - Funkce pro zpracování změn ve formulářových prvcích
 * @param {Function} props.handleSubmit - Funkce volaná při odeslání formuláře
 * @param {Object} props.filter - Aktuální stav filtrů
 * @param {Array} props.personList - Seznam osob pro výběr v selektu (odběratelé a dodavatelé)
 * @param {string} props.confirm - Text pro tlačítko potvrzení formuláře
 */

const InvoiceFilter = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;
//Vyrenderování pomocí JSX - filtru
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3 mt-3">
        <div className="col">
          <InputSelect
            name="buyerId"
            items={props.personList}
            handleChange={handleChange}
            label="Odběratel"
            prompt="nevybrán"
            value={filter.buyerId}
          />
        </div>
        <div className="col">
          <InputSelect
            name="sellerId"
            items={props.personList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.sellerId}
          />
        </div>
        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Počet faktur k vypsání"
            prompt="neuveden"
            value={filter.limit ? filter.limit : ""}
          />
        </div>
      </div>

      <div className="row mb-3 mt-3">
        <div className="col">
          <InputField
            type="number"
            min="0"
            name="maxPrice"
            handleChange={handleChange}
            label="Maximální částka"
            prompt="neuveden"
            value={filter.maxPrice ? filter.maxPrice : ""}
          />
        </div>
        <div className="col">
          <InputField
            type="number"
            min="0"
            name="minPrice"
            handleChange={handleChange}
            label="Minimálmální částka"
            prompt="neuveden"
            value={filter.minPrice ? filter.minPrice : ""}
          />
        </div>
        <div className="col">
          <InputField
            type="text"
            min="2"
            name="product"
            handleChange={handleChange}
            label="Produkt"
            prompt="neuveden"
            value={filter.product ? filter.product : ""}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;
