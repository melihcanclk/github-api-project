import "./App.css";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListUsers from "./ListUsers";

function SearchMode() {
  const usernameRef = useRef();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    searchInRepo();
  };

  const searchInRepo = () => {
    /**
     * search users with username and page number in github api at most 10 users per page
     */
    fetch(
      `https://api.github.com/search/users?q=${usernameRef.current.value}&&page=${page}&&per_page=10`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.items);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (usernameRef.current.value) {
      searchInRepo();
    }
  }, [page]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          placeholder='Enter Github Username'
          ref={usernameRef}
        />
      </form>
      <div className='pagination'>
        {page > 1 && (
          <button className='button' id='prev' onClick={handlePrev}>
            Prev
          </button>
        )}
        {page > 0 && (
          <button className='button' id='next' onClick={handleNext}>
            Next
          </button>
        )}
      </div>
      <ListUsers data={data} loading={loading} />
    </>
  );
}

export default SearchMode;
