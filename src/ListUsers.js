import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ListUsers({ loading, data }) {
  return (
    <>
      <div className='users'>
        {loading ? (
          <h1 className='user'>Loading...</h1>
        ) : (
          data?.map((user) => {
            return (
              <div className='user' key={user.avatar_url}>
                <img className='avatar-url' src={user.avatar_url} alt='user' />
                <div className='user-info'>
                  <a className='link' href={`/user-details/${user.login}`}>
                    <h2 className='user-info-text'>{user.login}</h2>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default ListUsers;
