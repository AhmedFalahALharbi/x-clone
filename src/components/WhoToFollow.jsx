const WhoToFollow = () => {
    const suggestions = [
      { id: 1, name: 'khalid', handle: '@khalid', profilePic: 'https://via.placeholder.com/40' },
      { id: 2, name: 'nasser', handle: '@nasser', profilePic: 'https://via.placeholder.com/40' },
      { id: 3, name: ' saad', handle: '@saad', profilePic: 'https://via.placeholder.com/40' },
    ];
  
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-right">
        <h2 className="text-xl font-semibold mb-4">من تتابع</h2>
        {suggestions.map(user => (
          <div key={user.id} className="flex items-center justify-between space-x-2 space-x-reverse mb-3">
            <img src={user.profilePic} alt={`${user.name}'s profile`} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <h4 className="font-bold">{user.name}</h4>
              <p className="text-gray-400">{user.handle}</p>
            </div>
            <button className="text-sm font-semibold text-blue-500 hover:underline">متابعة</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default WhoToFollow;
  