import "../styles/ownerpagesection.css";

import CafeCustomerChart from "../components/CafeCustomerChart";
import StatsDisplay from "../components/StatsDisplay";
import CustomerReviewSummary from "../components/CustomerReviewSummary";
import CustomerHistory from "../components/CustomerHistory";
import CommentsHistory from "../components/CommentsHistory";

function OwnerPageSection() {
  return (
    <div className="ownerpagesection">
      <div className="ops-header"></div>
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
        <div className="table-history">
          <CustomerHistory />
        </div>
        <div className="comments-history">
          <CommentsHistory />
        </div>
      </div>
    </div>
  );
}

export default OwnerPageSection;
