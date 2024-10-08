import { useState, useEffect } from "react";
import axios from "axios";

const TweetComposer = ({ onTweet }) => {
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`https://66e7e6bfb17821a9d9da7097.mockapi.io/Twitter?username=${storedUser.username}`)
      .then(response => {
        const user = response.data[0];
        setUserData(user);
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  const postTweet = () => {
    if (content.trim()) {
      axios
        .post("https://66e7e6bfb17821a9d9da7097.mockapi.io/Twitter", {
          username: userData.username,
          content,
          like: 0,
        })
        .then(response => {
          onTweet(response.data);
          setContent(""); 
        })
        .catch(error => console.error("Error posting tweet:", error));
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4 text-white">
      <div className="flex space-x-3 space-x-reverse items-start">
        {userData && (
          <img 
            src={userData.avatar} 
            alt="User Avatar" 
            className="w-12 h-12 rounded-full"
          />
        )}
        <textarea 
          placeholder="ماذا يحدث؟" 
          className="w-full p-2 rounded-lg bg-gray-700 text-white resize-none focus:outline-none"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4 space-x-reverse text-blue-400">
          <ImageIcon />
          <GifIcon />
          <PollIcon />
          <EmojiIcon />
          <LocationIcon />
        </div>
        <button 
          onClick={postTweet} 
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
        >
          نشر
        </button>
      </div>
    </div>
  );
};

// SVG Icons
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.75 3.25h-17.5c-1.24 0-2.25 1.01-2.25 2.25v13c0 1.24 1.01 2.25 2.25 2.25h17.5c1.24 0 2.25-1.01 2.25-2.25v-13c0-1.24-1.01-2.25-2.25-2.25zm-17.5-1.5h17.5c2.07 0 3.75 1.68 3.75 3.75v13c0 2.07-1.68 3.75-3.75 3.75h-17.5c-2.07 0-3.75-1.68-3.75-3.75v-13c0-2.07 1.68-3.75 3.75-3.75zm11.18 11.68l2.82 2.82h4.25v2.25h-17.5v-2.25h3.13l1.75-2.25h5.13zm-6.68-6.68c-1.52 0-2.75 1.23-2.75 2.75s1.23 2.75 2.75 2.75 2.75-1.23 2.75-2.75-1.23-2.75-2.75-2.75z"/>
  </svg>
);

const GifIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5.5 11.25h2.25v1.5h-1.5v1.5h1.5v1.5h-2.25v-4.5zm3.75 0h4.5v1.5h-3v1.5h3v1.5h-4.5v-4.5zm10.5 0h-1.5v3h1.5v1.5h-3v-6h3v1.5h-1.5v1.5z"/>
  </svg>
);

const PollIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 3.5H5c-.82 0-1.5.68-1.5 1.5v14c0 .82.68 1.5 1.5 1.5h14c.82 0 1.5-.68 1.5-1.5v-14c0-.82-.68-1.5-1.5-1.5zm0 15.5h-14v-14h14v14zm-9-4.5H7.5V12H10v2.5zm3.75-5.5h-2.25V7.5h2.25v1.5zm3.75 5.5h-2.25V12H17v2.5z"/>
  </svg>
);

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 22.5c-5.79 0-10.5-4.71-10.5-10.5s4.71-10.5 10.5-10.5 10.5 4.71 10.5 10.5-4.71 10.5-10.5 10.5zm0-19.5c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm4.5 6.75c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75-1.75-.78-1.75-1.75.78-1.75 1.75-1.75zm-9 0c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75-1.75-.78-1.75-1.75.78-1.75 1.75-1.75zm4.5 8.25c-2.28 0-4.4-.89-5.97-2.5l1.11-1.05c1.32 1.38 3.16 2.2 4.86 2.2s3.54-.82 4.86-2.2l1.11 1.05c-1.57 1.61-3.69 2.5-5.97 2.5z"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 6.64 8.38 10.83 9.03 11.13.25.11.52.11.76 0 .65-.3 9.03-4.49 9.03-11.13 0-5.24-4.26-9.5-9.5-9.5zm0 19.5c-1.05-.57-7.5-4.29-7.5-10 0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5c0 5.71-6.45 9.43-7.5 10zm0-15c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-.673-2.5-1.5s1.12-1.5 2.5-1.5 2.5 .673 2.5 1.5-1.12 1.5-2.5 1.5z"/>
  </svg>
);

export default TweetComposer;
