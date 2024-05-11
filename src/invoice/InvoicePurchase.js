/**
 * Komponenta zobrazující tabulku faktur pro dodavatele.
 * 
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} props.label Popisek zobrazovaný nad tabulkou.
 * @param {Array} props.invoicesList Seznam faktur k zobrazení.
 * @returns {JSX.Element} Komponenta zobrazuje tabulku faktur nebo zprávu o prázdném seznamu.
 */
export const InvoiceBuyer = ({label, invoicesList}) => {
    if (invoicesList.length > 0){
        //Vyrenderování pomocí JSX
        return(
            <div>
                <p>
                    {label} {invoicesList.length}
                </p>
    
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Dodvatel</th>
                        <th>Cena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoicesList.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.price}</td>
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    } 
    //Vyrenderování pomocí JSX v příadě neplatné podmínky
    return (
        <div>
            <p>{label} {invoicesList.length}</p>
        </div>
    )  
}

/**
 * Komponenta zobrazující tabulku faktur pro odběratele.
 * 
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} props.label Popisek zobrazovaný nad tabulkou.
 * @param {Array} props.invoicesList Seznam faktur k zobrazení.
 * @returns {JSX.Element} Komponenta zobrazuje tabulku faktur nebo zprávu o prázdném seznamu.
 */
export const InvoiceSeller = ({label, invoicesList}) => {

    if (invoicesList.length > 0){
        //Vyrenderování pomocí JSX
        return(
            <div>
                <p>
                    {label} {invoicesList.length}
                </p>
    
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Odběratel</th>
                        <th>Cena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoicesList.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td> 
                            <td>{item.buyer.name}</td>
                            <td>{item.price}</td>
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )

    }
    //Vyrenderování pomocí JSX v příadě neplatné podmínky
    return (
        <div>
            <p>{label} {invoicesList.length}</p>
        </div>
    )  
    
}
