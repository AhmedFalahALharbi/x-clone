const Tweet = ({ tweet }) => {
    return (
      <div className="flex flex-col space-y-2 p-4 border-b border-gray-700 text-right">
        <div className="flex items-center space-x-4 space-x-reverse">
          <img src={tweet.profilePic} alt="profile" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 space-x-reverse">
              <h4 className="font-bold text-lg">{tweet.username}</h4>
              <span className="text-gray-400">@{tweet.handle}</span>
              <span className="text-gray-400">• {tweet.timestamp}</span>
            </div>
            <p className="mt-1">{tweet.content}</p>
          </div>
        </div>
        <div className="flex justify-between text-gray-400 mt-2">
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>     </svg>
            <span>{tweet.comments}</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                 </svg>
            <span>{tweet.comments}</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </svg>
            <span>{tweet.retweets}</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.5 6.5 0 0 1 16.5 3 6.5 6.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{tweet.likes}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Tweet;
  