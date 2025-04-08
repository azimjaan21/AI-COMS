import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/components/_cardGrid.scss";

// 📦 Import your CCTV videos
import cctv1 from "../assets/videos/cctv1.mp4";
import cctv2 from "../assets/videos/cctv2.mp4";
import cctv3 from "../assets/videos/cctv3.mp4";
import cctv4 from "../assets/videos/cctv4.mp4";
import cctv5 from "../assets/videos/cctv5.mp4";
import cctv6 from "../assets/videos/cctv6.mp4";

// 📦 Recording indicator
import recLogo from "../assets/images/rec.png";

const CardGrid = () => {
  const navigate = useNavigate();

  // 📊 Card data with individual video
  const cardData = [
    { id: 1, cam: "CAM 1", time: "01:00:24", status: "Safe", safe: 12, danger: 5, video: cctv1 },
    { id: 2, cam: "CAM 2", time: "01:07:19", status: "Danger", safe: 8, danger: 12, video: cctv2 },
    { id: 3, cam: "CAM 3", time: "01:15:02", status: "Safe", safe: 16, danger: 3, video: cctv3 },
    { id: 4, cam: "CAM 4", time: "01:19:56", status: "Warning", safe: 25, danger: 9, video: cctv4 },
    { id: 5, cam: "CAM 5", time: "00:53:03", status: "Safe", safe: 15, danger: 2, video: cctv5 },
    { id: 6, cam: "CAM 6", time: "00:45:25", status: "Safe", safe: 26, danger: 12, video: cctv6 },
  ];

  // 🔗 Navigate to detailed camera page
  const handleCardClick = (id) => {
    navigate(`/camera/${id}`);
  };

  return (
    <div className="container-fluid card-grid-wrapper">
      <div className="row g-4">
        {cardData.map((card) => (
          <div key={card.id} className="col-12 col-sm-6 col-lg-6 col-xl-4">
            <div
              className="card h-100 shadow-sm overflow-hidden"
              onClick={() => handleCardClick(card.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Top section: CAM info + stats */}
              <div className="card-header d-flex justify-content-between align-items-center bg-light">
                <div className="d-flex align-items-center gap-4">
                  <span className="fw-bold">{card.cam}</span>
                  <span className="time">{card.time}</span>
                </div>

                <div className="d-flex align-items-center gap-2 fw-bold">
                  {(card.status === "Danger" || card.status === "Warning") && (
                    <div className="record me-1">
                      <img src={recLogo} alt="record" />
                    </div>
                  )}
                  <div className="dot orange"></div>
                  <span>{card.safe}</span>
                  <div className="dot red"></div>
                  <span>{card.danger}</span>
                </div>
              </div>

              {/* Status bar */}
              <div className={`status-bar text-white text-center ${card.status.toLowerCase()}`}>
                {card.status}
              </div>

              {/* Video */}
              <video className="video" src={card.video} muted autoPlay loop />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
