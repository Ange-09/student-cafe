import "../styles/ownerpagesection.css";

import CafeCustomerChart from "../components/CafeCustomerChart";
import StatsDisplay from "../components/StatsDisplay";
import CustomerReviewSummary from "../components/CustomerReviewSummary";

function OwnerPageSection() {
  return (
    <div className="ownerpagesection">
      <div className="ops-row-one">CloudSpace Study Hub</div>
      <div className="ops-row-two">
        <div className="linegraph">
          <CafeCustomerChart />
        </div>
        <div className="totalcustomers">
          <StatsDisplay />
        </div>
        <div className="ops-reviews">
          <CustomerReviewSummary />
        </div>
      </div>
      <div className="ops-row-three">
        <div className="seat-adjustment"></div>
        <div className="table-history"></div>
        <div className="comments-history"></div>
      </div>
    </div>
  );
}

export default OwnerPageSection;
