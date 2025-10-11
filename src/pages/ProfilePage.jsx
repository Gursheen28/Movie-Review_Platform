import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserReviews , deleteReview } from "../services/localStorage";
import { getCurrentUser } from "../services/auth";

// Safe Base64 encryption/decryption
const encryptPassword = (str) => window.btoa(unescape(encodeURIComponent(str)));
const isBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
};
const decryptPassword = (str) => {
  if (!str) return "";
  return isBase64(str) ? decodeURIComponent(escape(atob(str))) : str;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
      return;
    }

    // Fetch reviews
    const userReviews = getAllUserReviews(user.username || user.name || user.email);

    // Migrate old reviews with wrong keys
    const migratedReviews = userReviews.map(r => ({
      ...r,
      movieTitle: r.movieTitle || r.moieTitle || "Untitled Movie",
      content: r.content || r.text || "",
    }));

    const sortedReviews = [...migratedReviews].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setReviews(sortedReviews);

    setEditedUser({
      ...user,
      password: decryptPassword(user.password),
    });
  }, [user, navigate]);

  const handleSave = () => {
    const updatedUser = {
      ...editedUser,
      password: encryptPassword(editedUser.password), // store encrypted
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleDelete = (reviewId) => {
  setReviews(reviews.filter((rev) => rev.id !== reviewId));
  deleteReview(reviewId);
   };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        setEditedUser({ ...editedUser, avatar: reader.result });
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image under 2MB (PNG, JPG, WEBP, or GIF).");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">Redirecting to login...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-1000 p-8">
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-7xl mx-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-lg object-cover shadow-lg bg-gray-700"
          />
          <label className="mt-2 cursor-pointer text-blue-400 hover:text-blue-600">
            Change Avatar
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <h1 className="text-3xl font-bold mt-4 text-white">{user.username || user.name}</h1>
        </div>

        {/* Personal Info + Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-400">
              Personal Info
            </h2>
            <div className="space-y-3 text-white">
              <div>
                <label className="text-gray-400 text-sm">Username</label>
                {isEditing ? (
                  <input
                    className="w-full bg-gray-800 p-2 rounded text-white"
                    value={editedUser.username}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, username: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium">{user.username || user.name}</p>
                )}
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                {isEditing ? (
                  <input
                    className="w-full bg-gray-800 p-2 rounded text-white"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium">{user.email}</p>
                )}
              </div>
              <div>
                <label className="text-gray-400 text-sm">Password</label>
                {isEditing ? (
                  <input
                    type="password"
                    className="w-full bg-gray-800 p-2 rounded text-white"
                    value={editedUser.password}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, password: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium">{decryptPassword(user.password)}</p>
                )}
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="mt-4 bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition flex items-center font-medium"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="bg-gray-700 p-7 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-amber-400">
              Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-[200px] bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
                <div className="text-gray-400 text-sm">Reviews</div>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / (reviews.length || 1)).toFixed(1)}
                </div>
                <div className="text-gray-400 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-400">
            My Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-400 text-lg">You haven’t written any reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {review.movieTitle || "Untitled Movie"}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {review.date
                        ? new Date(review.date).toLocaleDateString()
                        : "Date unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center text-yellow-400 mb-2">
                    {"★".repeat(Math.round(review.rating / 2))}
                    <span className="ml-2 text-sm text-white">{review.rating}/10</span>
                  </div>

                  <p className="text-gray-300">{review.content}</p>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-gray-400 hover:text-red-500 transition flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
