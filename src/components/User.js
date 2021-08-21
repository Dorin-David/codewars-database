import style from '../styles/components/userCard.module.css';

function User(props){
   //receives user as props and render dynamically image
   // https://www.codewars.com/users/ [user] /badges/large
   return (<div className={style.wrapper}>
      <img src={`https://www.codewars.com/users/${props.user}/badges/large`} alt="user badge" />
      <p><span>warrior - </span>{props.user} ({props.name})</p>
      <p><span>clan - </span>{props.clan}</p>
      <p><span>completed katas - </span>{props.completedKatas}</p>
      <p><span>authored katas - </span>{props.authoredKatas}</p>
      <p><span>leaderboard position - </span>{props.leaderboard}</p>
      <h1>Languages</h1>
      <div className={style.languages}>
      {props.languages.map(lang => <div key={lang}>{lang}</div>)}
      </div>

   </div>)
    
}

export default User