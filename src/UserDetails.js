import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDetails() {
  const { username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [username]);
  /**
   * github profile page that shows user details
   */
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    //undefined means output expected in local timezone and default locale
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='page' key={data.id}>
      <div className='page-container'>
        <div className='user'>
          <img className='avatar-url' src={data.avatar_url} alt='user' />
          <div className='user-info'>
            <h2 className='user-info-text'>Kullanıcı adı : {data.login}</h2>
            <h2 className='user-info-text'>İsim : {data.name}</h2>
            <h2 className='user-info-text'>Github'a üye olma tarihi : {formatDate(data.created_at)}</h2>
            <h2 className='user-info-text'>Takipçi Sayısı : {data.followers}</h2>
            <h2 className='user-info-text'>Takip ettiği kişi sayısı : {data.following}</h2>
            <h2 className='user-info-text'>Herkese açık repo sayısı : {data.public_repos}</h2>
            <h2 className='user-info-text'>Herkese açık gist sayısı : {data.public_gists}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
