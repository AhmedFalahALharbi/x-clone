import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import WhoToFollow from '../components/WhoToFollow';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';

const Home = () => {
  const [tweets, setTweets] = useState([]);

  // Fetch tweets from the API
  useEffect(() => {
    axios
      .get('https://66e7e6bfb17821a9d9da7097.mockapi.io/Tweets')
      .then(response => {
        setTweets(response.data);
      })
      .catch(error => console.error("Error fetching tweets:", error));
  }, []);

  // Function to handle a new tweet being posted
  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-white" dir="rtl">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4">الرئيسية</h1>
          <div className="flex-1 bg-gray-900 text-white p-6 text-right">
            {/* Tweet Composer */}
            <TweetComposer onTweet={handleNewTweet} />

            {/* Tweets List */}
            <div className="space-y-4">
              {tweets.map(tweet => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar with SearchBar, Trending, and WhoToFollow */}
        <aside className="w-full hidden lg:inline lg:w-1/4 bg-gray-900 p-4 space-y-4">
          <SearchBar />
          <Trending />
          <WhoToFollow />
        </aside>
      </div>
    </div>
  );
};

export default Home;
