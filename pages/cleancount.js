import React, {useState, useEffect, useCallback} from 'react'

const Index = () => {

    const [contador, setCount] = useState(0)

    //Usando memoization (palavara oriunda de memo), 
    //assim mantendo o método, até mudar alguma dependência
    //Esse método é muito simples, mas essa prática ajuda em performance.

    const incrementa = useCallback(() => {
        setCount(val => val + 1)
    }, [])

    useEffect(()=> {

        let timer = setInterval(()=> {
            setCount(val => val + 1)
        }, 1000)

        console.log('entrou no useEffect')

        //cleanup, executado antes do useEffect
        return () => {
            clearInterval(timer)
            console.log('cleanup')
        }

    }, [contador])

    return (
        <div>
            <button onClick={incrementa}>Contador: {contador}</button>
        </div>
    )
}

export default Index