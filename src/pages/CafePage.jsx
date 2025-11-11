import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { dataBase } from "../context/DataBase";
import CafePageSection from "../sections/CafePageSection";
import ChatWidget from "../components/ChatWidget";

function CafePage() {
  const { id } = useParams(); // Get cafe ID from URL
  const navigate = useNavigate();
  const { selectedCafe, setSelectedCafe } = useContext(AppContext);

  useEffect(() => {
    // If no cafe is selected in context, find it from database using URL param
    if (!selectedCafe || selectedCafe.id !== parseInt(id)) {
      const cafe = dataBase.find((c) => c.id === parseInt(id));
      if (cafe) {
        setSelectedCafe(cafe);
      } else {
        // If cafe not found, redirect to home
        navigate("/");
      }
    }
  }, [id, selectedCafe, setSelectedCafe, navigate]);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Cafe details section */}
      <CafePageSection cafe={selectedCafe} />
      <ChatWidget />
    </div>
  );
}

export default CafePage;
