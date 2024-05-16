import { InvoicesStatistic, PersonStatistic } from "./Statistic";
import {Link} from "react-router-dom";

export function StatisticIndex() {
    return(
        <div>
            <InvoicesStatistic />
            <br />
            <PersonStatistic />
            <Link to={"/persons"} className="btn btn-primary">
                Zpět
            </Link>
        </div>
    )
}