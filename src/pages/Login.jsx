import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [errorMess, setErrorMess] = useState(
    ""
  );
  const [mess, setMess] = useState("");
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://66e7e6bfb17821a9d9da7097.mockapi.io/Twitter")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      errorLog("Please fill in all fields!");
      return;
    }

    const user = users.find((data) => data.username === userName);
    if (!user) {
      errorLog("Username is not found!");
      return;
    }

    if (user.password !== password) {
      errorLog("The password is wrong!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username: user.username }));
    navigate("/");
  };

  const errorLog = (text) => {
    setErrorMess("input-error focus-within:outline-none focus:outline-none");
    setMess(text);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl shadow-md">
        <h1 className="text-center text-3xl font-bold text-white mb-6">X</h1>
        
        <form onSubmit={submit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-black ${errorMess} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-black ${errorMess} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {mess && <p className="text-red-500 text-center">{mess}</p>}
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition">Log In</button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">Don’t have an account? 
            <Link to="/signup" className="text-white font-semibold ml-1 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
