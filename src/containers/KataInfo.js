import { useState, useEffect } from 'react';
import Spinner from '../components/UI/Spinner';
import Button from '../components/UI/Button';
import style from '../styles/components/kata-info.module.css';

const kataColors = {
    white: "#e6e6e6",
    yellow: "#ecb613",
    blue: "#3c7ebb",
    purple: "#866cc7"
}

function processDate(stamp){
    const date = new Date(stamp)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}


function KataInfo(props) {
    const [loadedKatas, setLoadedKatas] = useState({});
    const [kata, setKata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (loadedKatas[props.kata]) setKata(loadedKatas[props.kata])
        else {
            setLoading(true)
            try {
                (async function retrieveKata() {
                    const request = await fetch(`https://www.codewars.com/api/v1/code-challenges/${props.kata}`);
                    const data = await request.json();
                    const kataData = {
                        title: data.name,
                        author: data.createdBy.username,
                        authorPath: data.createdBy.url,
                        rank: data.rank.name,
                        color: kataColors[data.rank.color],
                        description: data.description,
                        attempts: data.totalAttempts,
                        completed: data.totalCompleted,
                        tags: data.tags,
                        url: data.url,
                        createdAt: processDate(data.approvedAt)
                    };
                    setLoadedKatas({ ...loadedKatas, [data.id]: kataData });
                    setKata(kataData);
                    setError(false)
                }())
            } catch (error) {
                setError(error)
            }
            setLoading(false);
        }
    }, [props.kata, loadedKatas])
    
      let kataInfo = null;
      if(kata){
          kataInfo = (<>
            <div className={style.overlay} onClick={props.closeKataInfo}></div>
          <div style={{ borderColor: kata.color }} className={style.wrapper}>
            <div style={{background: kata.color}} className={style['kata-rank']}>{kata.rank}</div>
            <h1>{kata.title}</h1>
            <p>{kata.description}</p>
            <a href={kata.url} target="_blank" rel="noreferrer"><Button>go to kata</Button></a>
            <h1>Statistics</h1>
            <div>
                <p> <span>Author - </span> <a href={kata.authorPath} target="_blank" rel="noreferrer" className={style.author}>{kata.author}</a></p>
                <p> <span>Attempts - </span>{kata.attempts}</p>
                <p> <span>Completed - </span>{kata.completed}</p>
                <p> <span>Created - </span>{kata.createdAt}</p></div>
                <h1>Tags</h1>
            <div className={style.tags}>
                {kata.tags.map(tag => <div key={tag}>{tag}</div>)}
            </div>
        </div>
        </>
        )
      }
    return loading ? <Spinner></Spinner> : !error ? kataInfo : <h1>An error occured</h1>

}

export default KataInfo