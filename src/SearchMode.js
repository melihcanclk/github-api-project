import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchMode() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePagination = (e) => {
    setLoading(true);
    const buttonID = e.currentTarget.id;
    setPage(buttonID === "next" ? page + 1 : page - 1);
    //fetchData(buttonID);
  };

  const searchInRepo = () => {
    // fetch(
    //   `https://api.github.com/search/users?q=${username}&&page=${page}&&per_page=10`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setData(data.items);
    //   });
  };

  return (
    <>
      <form className='form'>
        <input
          className='input'
          type='text'
          placeholder='Enter Github Username'
          value={username}
          onChange={handleChangeUsername}
        />
        <button className='button' type='button' onClick={searchInRepo}>
          Search
        </button>
      </form>
      <div className='pagination'>
        {page > 0 && (
          <button className='button' id='prev' onClick={handlePagination}>
            Prev
          </button>
        )}
        <button className='button' id='next' onClick={handlePagination}>
          Next
        </button>
      </div>
      <div className='users'>
        {loading ? (
          <h1 className='user'>Loading...</h1>
        ) : (
          data.map((user) => {
            return (
              <div className='user' key={user.avatar_url}>
                <img className='avatar-url' src={user.avatar_url} alt='user' />
                <div className='user-info'>
                  <h2 className='user-info-text'>{user.login}</h2>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default SearchMode;
