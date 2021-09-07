//Exemplos de cleanup, useCallback, useMemo e useRef

import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react'

const Index = () => {

    const [contador, setCount] = useState(0)
    const [calculoPesado, setCalcPes] = useState(0)
    const buttonRef = useRef(null)

    const getRef = () => {
        console.log('meu ref', buttonRef)
        buttonRef.current.innerText = 'Mudou!'
        //poderia integrar com alguma lib jquery, como CanvasJSChart
        //Ex.: $('#algo).metodo, poderia ser
        //     $(meuRef.current).metodo
    }

    //Usando memoization (palavara oriunda de memo), 
    //assim mantendo o método, até mudar alguma dependência
    //Esse método é muito simples, mas essa prática ajuda em performance.

    const incrementa = useCallback(() => {
        setCount(val => val + 1)
    }, [])

    useEffect(()=> {

        let timer = setInterval(()=> {
            setCount(val => val + 1)

            if (contador > 0 && (contador + 1) % 10 === 0) {
                setCalcPes(val => val + 1)
            }

        }, 1000)

        console.log('entrou no useEffect')

        //cleanup, executado antes do useEffect
        return () => {
            clearInterval(timer)
            console.log('cleanup')
        }

    }, [contador])

    //Conceito similar ao useCallback, porém com retorno.
    //Pode ser um cálculo ou mesmo um elemento (como aqui)
    //Útil para cálculos pesados, para não precisar renderizar sem necessidade.
    const mult = useMemo(()=> {
        const meuCalcLento = contador * 10
        return (
            <b>{meuCalcLento}</b>
        )
    }, [calculoPesado])

    return (
        <div>
            <button onClick={getRef}>Ref</button>
            <button onClick={incrementa} ref={buttonRef}>Contador: {contador}</button>
            <h2>{mult}</h2>
        </div>
    )
}

export default Index