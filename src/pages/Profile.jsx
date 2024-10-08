import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import WhoToFollow from '../components/WhoToFollow';
import Tweet from '../components/Tweet';
import { tweets } from '../Data';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`https://66e7e6bfb17821a9d9da7097.mockapi.io/Twitter?username=${storedUser.username}`)
      .then(response => {
        setUser(response.data[0]);
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-white" dir="rtl">
      <Sidebar />

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4">الملف الشخصي</h1>
          <div className="flex-1 bg-gray-900 text-white p-6 text-right">
            {user && (
              <>
                <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 mb-4">
                  <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-400">@{user.username}</p>
                  <p className="text-sm mt-2">{user.bio}</p>
                  <div className="flex space-x-4 space-x-reverse mt-2">
                    <span className="text-sm text-gray-400">
                      <strong className="text-white">{user.location}</strong>
                    </span>
                    <span className="text-sm text-gray-400">
                      انضم في {user.joinDate}
                    </span>
                  </div>
                  <div className="flex space-x-6 space-x-reverse mt-2">
                    <span className="text-sm text-gray-400">
                      <strong className="text-white">{user.followers}</strong> المتابعون
                    </span>
                    <span className="text-sm text-gray-400">
                      <strong className="text-white">{user.following}</strong> المتابعون
                    </span>
                  </div>
                  <button className="bg-blue-500 text-white rounded-full py-2 px-4 mt-4 hover:bg-blue-600 transition">
                    تعديل الملف الشخصي
                  </button>
                </div>

                <div className="flex justify-center space-x-6 space-x-reverse mb-6 text-gray-400">
                  <button className="text-white font-bold">التغريدات</button>
                  <button>التغريدات والردود</button>
                  <button>الوسائط</button>
                  <button>الإعجابات</button>
                </div>

                <div className="space-y-4">
                  {tweets
                    .filter(tweet => tweet.username === user.username)
                    .map(tweet => (
                      <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
              </>
            )}
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
