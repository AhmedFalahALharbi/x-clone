const Trending = () => {
    const trends = [
      { id: 1, title: '#HOTD', description: 'متداول في المملكة' },
      { id: 2, title: 'الراتب الأساسي', description: 'متداول في المملكة' },
    ];
  
    return (
      <div className="bg-gray-900 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">ماذا يحدث</h2>
        <div className="space-y-3">
          {trends.map(trend => (
            <div key={trend.id} className="p-2 hover:bg-gray-700 rounded">
              <p className="font-semibold text-white ">{trend.title}</p>
              <p className="text-gray-400 text-sm">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Trending;
  