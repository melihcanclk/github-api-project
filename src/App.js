import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [pageQueue, setPageQueue] = useState([
    {
      firstID: 0,
      lastID: 0,
    },
  ]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const fetchData = useCallback(
    async (buttonID) => {
      fetch(
        `https://api.github.com/users?since=${
          buttonID === `next`
            ? pageQueue[page].lastID
            : pageQueue[page - 1].firstID
        }&&per_page=10`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          buttonID === `next` && page === pageQueue.length - 1
            ? pageQueue[page].lastID === 0 && pageQueue[page].firstID === 0
              ? setPageQueue([
                  {
                    firstID: pageQueue[page].lastID,
                    lastID: data[data.length - 1].id,
                  },
                ])
              : setPageQueue([
                  ...pageQueue,
                  {
                    firstID: pageQueue[page].lastID,
                    lastID: data[data.length - 1].id,
                  },
                ])
            : setPageQueue([...pageQueue]);

          setLoading(false);
        });
    },
    [pageQueue, page]
  );

  const handlePagination = (e) => {
    setLoading(true);
    const buttonID = e.currentTarget.id;
    setPage(buttonID === "next" ? page + 1 : page - 1);
    fetchData(buttonID);
  };

  useEffect(() => {
    fetchData("next");
  }, []);

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
                  <img
                    className='avatar-url'
                    src={user.avatar_url}
                    alt='user'
                  />
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
