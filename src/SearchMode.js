import "./App.css";
import { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListUsers from "./ListUsers";

function SearchMode() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePrev = (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(page - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(page + 1);
  };
  const searchInRepo = () => {
    /**
     * search users with username and page number in github api at most 10 users per page
     */
    fetch(
      `https://api.github.com/search/users?q=${username}&&page=${page}&&per_page=10`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.items);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchInRepo();
  }, [page]);

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
        {page > 1 && (
          <button className='button' id='prev' onClick={handlePrev}>
            Prev
          </button>
        )}
        <button className='button' id='next' onClick={handleNext}>
          Next
        </button>
      </div>
      <ListUsers data={data} loading={loading} />
    </>
  );
}

export default SearchMode;
