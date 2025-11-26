import Header from "../components/Header";
import ChatWidgetInbox from "../components/ChatWidgetInbox";
import OwnerPageSection from "../sections/OwnerPageSection";
import EditSeatsButton from "../components/EditSeatsButton";

function OwnerPage() {
  return (
    <div>
      <Header />
      <EditSeatsButton />
      <ChatWidgetInbox />
      <OwnerPageSection />
    </div>
  );
}

export default OwnerPage;
