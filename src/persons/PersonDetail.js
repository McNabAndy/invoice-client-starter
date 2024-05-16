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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";
import { InvoiceBuyer, InvoiceSeller } from "../invoice/InvoicePurchase";
import {Link} from "react-router-dom";

/**
 * Komponenta zobrazující detaily konkrétní osoby a seznamy přijatých a vydaných faktur.
 * Načítá data o osobě pomocí jejího ID z URL parametrů. Po úspěšném načtení osobních dat
 * dále načítá seznamy faktur spojených s touto osobou jako kupujícím a prodávajícím.
 *
 * @returns {JSX.Element} Komponenta pro zobrazení detailů osoby a souvisejících faktur.
 */

const PersonDetail = () => {
  // Extrahuje ID z URL pomocí React Router hooku `useParams`.
  const { id } = useParams();

  // Lokální stav `invoice` pro ukládání načtených dat o faktuře.
  const [person, setPerson] = useState({});

  // Lokální stav uchovávající aktuální seznam Dodavatelů
  const [sellerList, setSellerList] = useState([]);

  // Lokální stav uchovávající aktuální seznam Odběratelů
  const [buyerList, setBuyerList] = useState([]);

  // Effect hook pro načtení dat o faktuře z API při prvním renderování komponenty nebo změně ID.
  useEffect(() => {
    apiGet("/api/persons/" + id)
      .then((data) => {
        setPerson(data);
        // Nyní je bezpečné volat další API s použitím `data.identificationNumber`
        // Provedení paralelních API volání pro získání seznamů faktur
        return Promise.all([
          apiGet(
            "/api/identification/" + data.identificationNumber + "/purchases"
          ),
          apiGet("/api/identification/" + data.identificationNumber + "/sales"),
        ]);
      })
      .then(([purchaseData, salesData]) => {
        setSellerList(purchaseData);
        setBuyerList(salesData);
      })
      .catch((error) => {
        console.error("Chyba při načítání osoby nebo faktur", error);
      });
  }, [id]); // Závislost na ID zajišťuje aktualizaci dat při změně ID v URL.

  // Konstanta pro upravení názvu země
  const country =
    Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

  //Vyrenderování pomocí JSX
  return (
    <>
      <div>
        <h1>Detail osoby</h1>
        <hr />
        <div className="row">
          <div className="col">
            <h3>
              {person.name} ({person.identificationNumber})
            </h3>
            <p>
              <strong>DIČ:</strong>
              <br />
              {person.taxNumber}
            </p>
            <p>
              <strong>Bankovní účet:</strong>
              <br />
              {person.accountNumber}/{person.bankCode} ({person.iban})
            </p>
            <p>
              <strong>Tel.:</strong>
              <br />
              {person.telephone}
            </p>
            <p>
              <strong>Mail:</strong>
              <br />
              {person.mail}
            </p>
            <p>
              <strong>Sídlo:</strong>
              <br />
              {person.street}, {person.city},{person.zip}, {country}
            </p>
            <p>
              <strong>Poznámka:</strong>
              <br />
              {person.note}
            </p>
          </div>
          <div className="col">
            <InvoiceBuyer
              label="Počet přijatých faktur: "
              invoicesList={sellerList}
            />
            <br />
            <InvoiceSeller
              label="Počet vydaných faktur: "
              invoicesList={buyerList}
            />
          </div>
        </div>
          <Link to={"/persons"} className="btn btn-info">
                Zpět
          </Link>
      </div>
    </>
  );
};

export default PersonDetail;
