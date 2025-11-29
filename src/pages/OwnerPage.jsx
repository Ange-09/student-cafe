import Header from "../components/Header";
import ChatWidgetInbox from "../components/ChatWidgetInbox";
import OwnerPageSection from "../sections/OwnerPageSection";
import EditSeatsButton from "../components/EditSeatsButton";
import Footer from "../components/Footer";

function OwnerPage() {
  return (
    <div>
      <Header />
      <EditSeatsButton />
      <ChatWidgetInbox />
      <OwnerPageSection />
      <Footer />
    </div>
  );
}

export default OwnerPage;
