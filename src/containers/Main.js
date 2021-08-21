import { useState, useEffect, useCallback } from 'react';
import Form from '../components/Form';
import User from '../components/User';

function Main() {
    //setup base url
    const [baseUrl] = useState('https://www.codewars.com/api/v1/');
    //user and user related info
    const [user, setUser] = useState("");
    const [katas, setKatas] = useState([]);
    // const [selectedKata, setSelectedKata] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    

    //get the user
    async function getUser(user) {
        try {
            const request = await fetch(baseUrl + `users/${user}`);
            const data = await request.json();
            if(data.success === false) throw new Error('user not found')
            setUser(data);
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true);
        }

    }
    //get katas

    const getKatas = useCallback(async function (user) {
        //note: should be using buil-int pagination? => ?page=0 (default)
        // first version will only retrieve the last 200 katas; in the future we may add the possibility to take more
        if(!user) return
        const url = baseUrl + `users/${user}/code-challenges/completed`;
        try {
            const request = await fetch(url);
            const data = await request.json();
            setKatas(data);
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true);
        }

    }, [baseUrl])

    // async function getSpecificKata(kata) {
    //     const url = baseUrl + `code-challenges/${kata}`;
    // }

    //re-fetch katas whenever the user changes
    useEffect(() => {
        const { username } = user;
        getKatas(username)
    },
        [user, getKatas])

    useEffect(() => {
        console.log('triggered katas')
        console.log(katas)
    }, [katas])

    function handleFormChange(e){
       setQuery(e.target.value)
    }

    function submitSearch(){
        if(!query) return
        getUser(query);
        setQuery('')
    }

    //toDo: setup logic for differenciating not found users and other errors
    let userCard = <h1>No user was found</h1>;
    if(user) {
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

    return (<>
        <Form 
          handleFormChange={handleFormChange}
          value={query}
          submitSearch={submitSearch}
        />
        {/* handle error message (modal?) */}
        {!error ? userCard : <h1>No user was found</h1>}
    {/* <img src="https://www.codewars.com/users/DevDor/badges/large" alt="" /> */}
    </>)
}

export default Main