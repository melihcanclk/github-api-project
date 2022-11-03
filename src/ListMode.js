import "./App.css";
import { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListUsers from "./ListUsers";

function App() {
  const [data, setData] = useState([]);
  const [pageQueue, setPageQueue] = useState([
    {
      firstID: 0,
      lastID: 0,
    },
  ]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
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
      <ListUsers data={data} loading={loading} />
    </>
  );
}

export default App;
