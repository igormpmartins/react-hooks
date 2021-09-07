import React from 'react'
import useSWR, {mutate} from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const Index = () => {
    const url = 'https://httpbin.org/delay/3'
    const {data, error} = useSWR(url, fetcher)

    //utilizando o mutate para atualizar
    const refresh = () => {
        mutate(url)
    }

    if (!data) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2>Dados</h2>
            <button onClick={refresh}>Atualizar</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Index