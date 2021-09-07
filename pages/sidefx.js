import React, {useState, useEffect} from 'react'

/* Custom Hook, utilizando useEffect */

const useHttpGet = url => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(0)

    const refresh = () => {
        setForceUpdate(val => val +1)
    }

    useEffect(async()=> {
        console.log('side effect')
        setLoading(true)
        const data = await fetch(url)
        const json = await data.json()
        setData(json)
        setLoading(false)
    }, [forceUpdate])

    return [data, loading, refresh]

}

const Side = () => {

    /*código original
    const [ip, setIp] = useState('')
    const [loading, setLoading] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(0)

    const refresh = () => {
        setForceUpdate(val => val +1)
    }

    useEffect(async()=> {
        console.log('side effect')
        setLoading(true)
        const data = await fetch('https://httpbin.org/delay/3')
        const json = await data.json()
        setIp(json.origin)
        console.log(json.origin)
        setLoading(false)
    }, [forceUpdate])
    */

    const [data, loading, refresh] = useHttpGet('https://httpbin.org/delay/3')
    const ip = data.origin

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>My IP: {ip}</h1>
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}

export default Side