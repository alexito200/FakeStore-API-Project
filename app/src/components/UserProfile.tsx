import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "./userService";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setUser, clearUser } from "../redux/userSlice"; // Import Redux actions
import { RootState } from "../redux/store"; // Import RootState from your store setup
import { UserProfileProps } from "../redux/userSlice"; // UserProfileProps type

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use RootState to type the state in the Redux store
  const userProfileFromRedux = useSelector((state: RootState) => state.user.user);

  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(userProfileFromRedux); // Initialize with Redux data
  const [fullName, setFullName] = useState<string>(userProfileFromRedux?.fullName || "");
  const [address, setAddress] = useState<string>(userProfileFromRedux?.address || "");
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore on component mount if not already in Redux
  useEffect(() => {
    if (!userProfileFromRedux) {
      const fetchUserProfile = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            // Fetch the document from Firestore
            const profile = await getUserProfile(user.uid);
            if (profile) {
              // Type assertion to cast DocumentData to UserProfileProps
              const userProfileData: UserProfileProps = {
                uid: user.uid,
                email: user.email || "", // Email is optional, but you can handle it here
                fullName: profile.fullName || "",
                address: profile.address || "",
              };
              
              setUserProfile(userProfileData); // Set the state with the typed data
              dispatch(setUser(userProfileData)); // Update Redux state
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
        // Update Firestore and Redux state
        await updateUserProfile(user.uid, { fullName, address });
        const updatedProfile = { ...userProfile!, fullName, address };
        setUserProfile(updatedProfile); // Update local state
        dispatch(setUser(updatedProfile)); // Update Redux state
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
        dispatch(clearUser()); // Clear user data from Redux
        alert("Account deleted successfully!");
        navigate("/"); // Redirect to login page after deletion
      } catch (error) {
        setError("Failed to delete account.");
        console.error("Error deleting account:", error);
      }
    }
  };

  // Handle Continue Shopping
  const handleContinueShopping = () => {
    navigate("/home"); // Redirect to home page
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

          {/* Continue Shopping Button */}
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
