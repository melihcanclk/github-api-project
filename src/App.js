import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const searchInRepo = () => {};

  return (
    <div className='page'>
      <div className='page-container'>
        <form className='form'>
          <input
            className='input'
            type='text'
            placeholder='Enter Github Username'
            value={username}
            onChange={handleChangeUsername}
          />
          <button className='button' type='button' onClick={searchInRepo}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        <div className='users'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.map((user) => {
              return (
                <div className='user' key={user.avatar_url}>
                  <img className="avatar-url" src={user.avatar_url} alt='user' />
                  <div className='user-info'>
                    <h2>{user.login}</h2>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
