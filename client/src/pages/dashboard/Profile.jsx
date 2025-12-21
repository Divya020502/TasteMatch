import { useContext } from "react";
import Navbar from "../../components/layout/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { TasteContext } from "../../context/TasteContext";
import "../../styles/profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { taste, cuisines, diet } = useContext(TasteContext);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{user?.name}</h2>
              <p className="email">{user?.email}</p>
              <span className="role">{user?.role}</span>
            </div>
          </div>

          {/* Taste Summary */}
          <div className="section">
            <h3>🎯 Taste Profile</h3>

            {taste &&
              Object.entries(taste).map(([key, value]) => (
                <div key={key} className="taste-row">
                  <span className="label">{key}</span>
                  <div className="bar">
                    <div
                      className="fill"
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                  <span className="value">{value}/10</span>
                </div>
              ))}
          </div>

          {/* Preferences */}
          <div className="section">
            <h3>🍽️ Preferences</h3>

            <p>
              <strong>Cuisines:</strong>{" "}
              {cuisines.length > 0
                ? cuisines.join(", ")
                : "Not selected"}
            </p>

            <p>
              <strong>Diet:</strong>{" "}
              {diet ? diet : "Any"}
            </p>
          </div>

          {/* Actions */}
          <div className="actions">
            <Link to="/taste" className="btn primary">
              Edit Taste Profile
            </Link>

            <Link to="/explore" className="btn secondary">
              Explore Dishes
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
