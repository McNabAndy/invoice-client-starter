import React from "react";
import {Link} from "react-router-dom";
/**
 * 
 * @param {Object} props Vlastnosti komponenty
 * @param {string} props.label Popisek, který se zobrazuje nad tabulkou.
 * @param {Array} props.items Seznam faktur k zobrazení.
 * @param {Function} props.deleteInvoice Funkce pro mazání faktur.
 * @returns {JSX.Element} Komponenta, která zobrazuje tabulku faktur s tlačítky pro akce.
 */

const InvoiceTable = ({label, items, deleteInvoice}) => {
    //Vyrenderování pomocí JSX
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Částka</th>
                    <th colSpan={3}className="text-end">Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.issued}</td>
                        <td>{item.dueDate}</td>
                        <td>{item.price}</td>
                        <td className="text-end">
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}  
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
            <Link to={"/invoices/create"} className="btn btn-success me-2">
                Nová faktura
            </Link>
            <Link to={"/invoices/show/statistics"} className="btn btn-info">
                Statistiky
            </Link>
        </div>
    );
};

export default InvoiceTable;