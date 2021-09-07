//Mesma coisa do sidefx, porém com um clean para contornar uma situação
//Notar que usando async, já resolve também!

import React, {useState, useEffect} from 'react'

const useHttpGet = url => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(0)

    const refresh = () => {
        setForceUpdate(val => val +1)
    }

    //se não usar async no callback useEffect, ocorre o problema do memory leak!
    //"Warning: Can't perform a React state update on an unmounted component. "


    useEffect(()=> {
        let mounted = true
        const load = async() => {
            console.log('side effect')
            setLoading(true)
            const data = await fetch(url)
            const json = await data.json()
            //contornando a situação
            if (mounted) {
                setData(json)
                setLoading(false)
            }
        }
        load()
        return () => {
            mounted = false
        }
    }, [forceUpdate, url])

    return [data, loading, refresh]

}

const MeuIp = () => {
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

const Index = () => {

    /*
    const [count, setCount] = useState(0)

    const incrementa = () => {
        setCount(count + 1)
    }*/

    /*
    useEffect(()=> {
        console.log('entrou no useEffect')
        return () => {
            //cleanup, executado antes do useEffect
            console.log('cleanup')
        }
    }, [count])
    */

    const [show, setShow] = useState(true)
    const hide = () => {
        setShow(false)
    }

    return (
        <div>
            {show && <MeuIp />}
            <h2 onClick={hide}>Hide</h2>
        </div>
    )
}

export default Index