import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "./userService";
import { auth } from "../firebaseConfig";
import { setUser, clearUser } from "../redux/userSlice"; 
import { RootState } from "../redux/store"; 
import { UserProfileProps } from "../redux/userSlice"; 
import '../App.css'

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfileFromRedux = useSelector((state: RootState) => state.user.user);
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(userProfileFromRedux); 
  const [fullName, setFullName] = useState<string>(userProfileFromRedux?.fullName || "");
  const [address, setAddress] = useState<string>(userProfileFromRedux?.address || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userProfileFromRedux) {
      const fetchUserProfile = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            const profile = await getUserProfile(user.uid);
            if (profile) {
              const userProfileData: UserProfileProps = {
                uid: user.uid,
                email: user.email || "",
                fullName: profile.fullName || "",
                address: profile.address || "",
              };
              setUserProfile(userProfileData); 
              dispatch(setUser(userProfileData)); 
              setFullName(userProfileData.fullName);
              setAddress(userProfileData.address);
            }
          } catch (error) {
            setError("Failed to load user profile.");
            console.error("Error fetching user profile:", error);
          }
        } else {
          setError("No user is signed in.");
        }
      };
      fetchUserProfile();
    }
  }, [userProfileFromRedux, dispatch]);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateUserProfile(user.uid, { fullName, address });
        const updatedProfile = { ...userProfile!, fullName, address };
        setUserProfile(updatedProfile); 
        dispatch(setUser(updatedProfile)); 
        alert("Profile updated successfully!");
      } catch (error) {
        setError("Failed to update profile.");
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUserAccount(user.uid);
        dispatch(clearUser()); 
        alert("Account deleted successfully!");
        navigate("/"); 
      } catch (error) {
        setError("Failed to delete account.");
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      {error && <p className="error-message">{error}</p>}

      {userProfile ? (
        <div className="profile-details">
          <p><strong>Full Name:</strong> {userProfile.fullName}</p>
          <p><strong>Address:</strong> {userProfile.address}</p>

          <div className="profile-update-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>

          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>

          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>

          <button className="order-history-button" onClick={() => navigate('/order-history')}>
            View Order History
          </button>

          <button className="go-home-btn" onClick={handleGoHome}>
            Log out
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
