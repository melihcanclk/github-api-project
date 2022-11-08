import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ListUsers({ data }) {
  return (
    <>
      {data?.map((user) => {
        return (
          <div className='user' key={user.avatar_url}>
            <img className='avatar-url' src={user.avatar_url} alt='user' />
            <div className='user-info'>
              <a className='link' href={`/${user.login}`}>
                <h2 className='user-info-text'>{user.login}</h2>
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListUsers;
