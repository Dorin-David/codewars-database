import { useState, useEffect, useCallback } from 'react';
import Form from '../components/Form';
import User from '../components/User';
import Katas from '../components/Katas/Katas';
import Spinner from '../components/UI/Spinner';
import KataInfo from './KataInfo';
import Button from '../components/UI/Button';

function Main() {
    //setup base url
    const [baseUrl] = useState('https://www.codewars.com/api/v1/');
    //user and user related info
    const [user, setUser] = useState("");
    const [katas, setKatas] = useState([]);
    // const [selectedKata, setSelectedKata] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [showedKataInfo, setShowedKataInfo] = useState(null);
    const [showKata, setShowKata] = useState(false);
    const [offset, setOffset] = useState(50)


    //get the user
    async function getUser(user) {
        setLoading(true);
        try {
            const request = await fetch(baseUrl + `users/${user}`);
            const data = await request.json();
            if (data.success === false) throw new Error('user not found')
            setUser(data);
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true);
        }
        setLoading(false);

    }
    //get katas

    const getKatas = useCallback(async function (user) {
        //note: should be using buil-int pagination? => ?page=0 (default)
        // first version will only retrieve the last 200 katas; in the future we may add the possibility to take more
        if (!user) return
        const url = baseUrl + `users/${user}/code-challenges/completed`;
        setLoading(true);
        try {
            const request = await fetch(url);
            const data = await request.json();
            setKatas(data);
            setError(false)
        } catch (error) {
            console.log(error)
            setLoading(false);
            setError(true);
        }
        setLoading(false);

    }, [baseUrl])

     function showSpecificKata(id) {
        setShowKata(true);
        setShowedKataInfo(id)
    }

    function closeSpecifiKata(){
        setShowKata(false)
    }

    //re-fetch katas whenever the user changes
    useEffect(() => {
        const { username } = user;
        getKatas(username)
    },
        [user, getKatas])

    function handleFormChange(e) {
        setQuery(e.target.value)
    }

    function submitSearch() {
        if (!query) return
        getUser(query);
        setQuery('')
    }

    //toDo: setup logic for differenciating not found users and other errors
    let userCard = <h1>No user was found</h1>;
    if (user) {
        userCard = <User
            user={user.username}
            name={user.name}
            clan={user.clan}
            completedKatas={user.codeChallenges.totalCompleted}
            authoredKatas={user.codeChallenges.totalAuthored}
            leaderboard={user.leaderboardPosition}
            languages={Object.keys(user.ranks.languages)}
        />
    }

    let response = <Spinner />;
    if (!loading) {
        response = (<>
            <Form
                handleFormChange={handleFormChange}
                value={query}
                submitSearch={submitSearch}
            />
            {!error ? userCard : <h1>No user was found</h1>}
            {!error && <Katas showKata={showSpecificKata} katas={katas.data ? katas.data.slice(0, offset) : []}/>}
            {!error && <Button onButtonClick={() => setOffset(offset => offset += 50)}>Show more</Button>}
            {showKata && <KataInfo kata={showedKataInfo} closeKataInfo={closeSpecifiKata}/>}
        </>)
    }

    return response
}

export default Main