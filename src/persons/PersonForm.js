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
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import Country from "./Country";

/**
 * Komponenta pro vytvoření nebo úpravu osobnosti. Tato komponenta používá formulář
 * k získání a úpravě informací o osobě, jako jsou jméno, identifikační číslo,
 * bankovní údaje atd. Data jsou získána a odeslána na server prostřednictvím API.
 *
 * @returns {JSX.Element} Formulář pro vytvoření nebo úpravu osobnosti.
 */
const PersonForm = () => {
  const navigate = useNavigate();
  // Extrahuje ID z URL pomocí React Router hooku `useParams`.
  const { id } = useParams();

  // Stav pro ukládání údajů o osobě
  const [person, setPerson] = useState({
    name: "",
    identificationNumber: "",
    taxNumber: "",
    accountNumber: "",
    bankCode: "",
    iban: "",
    telephone: "",
    mail: "",
    street: "",
    zip: "",
    city: "",
    country: Country.CZECHIA,
    note: "",
  });

  // Stav pro sledování odeslání a výsledku operace
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  /**
   * Načítá seznam osob a, pokud existuje id, načítá detaily o osobe.
   * Závisí na změně id, aby se přizpůsobila aktualizacím faktury.
   */
  useEffect(() => {
    if (id) {
      apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }
  }, [id]);

  /**
   * Ošetřuje událost odeslání formuláře. Funkce se rozhodne mezi aktualizací stávající osoby
   * nebo vytvořením nové, v závislosti na přítomnosti `id`. Po úspěšné operaci přesměruje uživatele
   * na stránku s přehledem osob. Při chybě se zobrazí chybová zpráva.
   * Nastaví zpoždění pro přesměrování aby byla vidět flash message na stejné stránce
   *
   * @param {Event} e - událost, která je vyvolána odesláním formuláře
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    (id
      ? apiPut("/api/persons/" + id, person)
      : apiPost("/api/persons", person)
    )
      .then((data) => {
        setSent(true);
        setSuccess(true);
        setTimeout(() => {
          navigate("/persons");
        }, 1000);
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
  return (
    <div>
      <h1>{id ? "Upravit" : "Vytvořit"} osobu</h1>
      <hr />
      {errorState ? (
        <div className="alert alert-danger">{errorState}</div>
      ) : null}
      {sent && (
        <FlashMessage
          theme={success ? "success" : ""}
          text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className=" row mb-3">
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="personName"
              min="3"
              label="Jméno"
              prompt="Zadejte celé jméno"
              value={person.name}
              handleChange={(e) => {
                setPerson({ ...person, name: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="identificationNumber"
              min="3"
              label="IČO"
              prompt="Zadejte IČO"
              value={person.identificationNumber}
              handleChange={(e) => {
                setPerson({ ...person, identificationNumber: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="taxNumber"
              min="3"
              label="DIČ"
              prompt="Zadejte DIČ"
              value={person.taxNumber}
              handleChange={(e) => {
                setPerson({ ...person, taxNumber: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="accountNumber"
              min="3"
              label="Číslo bankovního účtu"
              prompt="Zadejte číslo bankovního účtu"
              value={person.accountNumber}
              handleChange={(e) => {
                setPerson({ ...person, accountNumber: e.target.value });
              }}
            />
          </div>
          <div className="col-2">
            <InputField
              required={true}
              type="text"
              name="bankCode"
              min="3"
              label="Kód banky"
              prompt="Zadejte kód banky"
              value={person.bankCode}
              handleChange={(e) => {
                setPerson({ ...person, bankCode: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="IBAN"
              min="3"
              label="IBAN"
              prompt="Zadejte IBAN"
              value={person.iban}
              handleChange={(e) => {
                setPerson({ ...person, iban: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="telephone"
              min="3"
              label="Telefon"
              prompt="Zadejte Telefon"
              value={person.telephone}
              handleChange={(e) => {
                setPerson({ ...person, telephone: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="mail"
              min="3"
              label="Mail"
              prompt="Zadejte mail"
              value={person.mail}
              handleChange={(e) => {
                setPerson({ ...person, mail: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <InputField
              required={true}
              type="text"
              name="street"
              min="3"
              label="Ulice"
              prompt="Zadejte ulici"
              value={person.street}
              handleChange={(e) => {
                setPerson({ ...person, street: e.target.value });
              }}
            />
          </div>

          <div className="col">
            <InputField
              required={true}
              type="text"
              name="ZIP"
              min="3"
              label="PSČ"
              prompt="Zadejte PSČ"
              value={person.zip}
              handleChange={(e) => {
                setPerson({ ...person, zip: e.target.value });
              }}
            />
          </div>

          <div className="col">
            <InputField
              required={true}
              type="text"
              name="city"
              min="3"
              label="Město"
              prompt="Zadejte město"
              value={person.city}
              handleChange={(e) => {
                setPerson({ ...person, city: e.target.value });
              }}
            />
          </div>
        </div>

        <div className=" mb-3">
          <InputField
            required={true}
            type="text"
            name="note"
            label="Poznámka"
            value={person.note}
            handleChange={(e) => {
              setPerson({ ...person, note: e.target.value });
            }}
          />
        </div>

        <div className=" mb-3">
          <h6>Země:</h6>

          <InputCheck
            type="radio"
            name="country"
            label="Česká republika"
            value={Country.CZECHIA}
            handleChange={(e) => {
              setPerson({ ...person, country: e.target.value });
            }}
            checked={Country.CZECHIA === person.country}
          />
        </div>

        <div className=" mb-3">
          <InputCheck
            type="radio"
            name="country"
            label="Slovensko"
            value={Country.SLOVAKIA}
            handleChange={(e) => {
              setPerson({ ...person, country: e.target.value });
            }}
            checked={Country.SLOVAKIA === person.country}
          />
        </div>


        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};

export default PersonForm;
