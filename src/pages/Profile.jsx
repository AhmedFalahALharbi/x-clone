import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import WhoToFollow from '../components/WhoToFollow';
import Tweet from '../components/Tweet';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.username) {
      axios.get(`https://66e7e6bfb17821a9d9da7097.mockapi.io/Twitter/${storedUser.id}`)
        .then(userResponse => {
          setUser(userResponse.data);
          return axios.get('https://66e7e6bfb17821a9d9da7097.mockapi.io/Tweets');
        })
        .then(tweetsResponse => {
          const userTweets = tweetsResponse.data.filter(tweet => tweet.username === storedUser.username);
          setTweets(userTweets);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setError("Failed to load profile data. Please try again.");
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  if (!user) {
    return <div className="text-white">User not found. Please log in again.</div>;
  }

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-white" dir="rtl">
      <Sidebar />

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4">الملف الشخصي</h1>
          <div className="flex-1 bg-gray-900 text-white p-6 text-right">
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 mb-4">
              <img src={user.avatar || 'https://via.placeholder.com/100'} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400">@{user.username}</p>
              <p className="text-sm mt-2">{user.bio || 'No bio available'}</p>
              <div className="flex space-x-4 space-x-reverse mt-2">
                <span className="text-sm text-gray-400">
                  <strong className="text-white">{user.location || 'Location unknown'}</strong>
                </span>
                <span className="text-sm text-gray-400">Joined {user.joinDate || 'Date not available'}</span>
              </div>
              <div className="flex space-x-6 space-x-reverse mt-2">
                <span className="text-sm text-gray-400">
                  <strong className="text-white">{user.followers || 0}</strong> المتابعون
                </span>
                <span className="text-sm text-gray-400">
                  <strong className="text-white">{user.following || 0}</strong> المتابعون
                </span>
              </div>
              <button className="bg-blue-500 text-white rounded-full py-2 px-4 mt-4 hover:bg-blue-600 transition cursor-pointer">تعديل الملف الشخصي</button>
            </div>

            <div className="space-y-4">
              {tweets.length > 0 ? (
                tweets.map(tweet => (
                  <Tweet key={tweet.id} tweet={tweet} />
                ))
              ) : (
                <p className="text-gray-400">No tweets to display.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="w-full md:w-1/4 bg-gray-900 p-4 space-y-4">
          <SearchBar />
          <Trending />
          <WhoToFollow />
        </aside>
      </div>
    </div>
  );
};

export default Profile;
