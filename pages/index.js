import React, {useState, useEffect} from 'react'

//Uso do hook useState

//abstraindo a lógica, aqui está um Custom Hook
const useContador = initial => {
    const [count, setCount] = useState(initial)
    const incrementa = () => {
        setCount(value => value + 1)
    }
    return [count, incrementa]
}

const Display = props => {
    /*versão original
    const [count, setCount] = useState(0)

    const incrementa = () => {
        setCount(value => value + 1)
        console.log(count)
    }*/
    const [count, incrementa] = useContador(0)

    return <h2 onClick={incrementa}>{props.title} = {count}</h2>
}

const Index = () => {
    //reutilizando a mesma ideia
    const [contador, incrementa] = useContador(10)

    //Se não for informada a lista de deps, irá executar a cada alteração do componente (global)
    //Se informada uma lista vazia, irá disparar apenas ao montar esse componente
    //Por fim, passando uma lista de deps, irá executar sempre que alterar as deps

    useEffect(()=> {
        console.log('entrou no useEffect')
    }, [contador])

    return (
        <div>
            <h1>Teste</h1>
            <h1 onClick={incrementa}>Outro contador {contador}</h1>
            <Display title='Contador' />
        </div>
    )
}

export default Index