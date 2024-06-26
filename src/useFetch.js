import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const aboardCont = new AbortController();
        fetch(url)
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if(err.name === "AbortError") {
                    console.log("fetch error");
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })
        return () => aboardCont.abort();
    }, [url])

    return { data, isPending, error };
}

export default useFetch;