//Exemplos de cleanup, useCallback, useMemo e useRef

import React, {useEffect, useRef, useState} from 'react'

const Index = () => {

    const buttonRef = useRef(null)
    const divRef = useRef(null)
    const [forceUpdate, setForceUpdate] = useState(0)

    const getRef = () => {
        console.log('meu ref', buttonRef)
        buttonRef.current.innerText = 'Mudou!'
    }

    const callUpdate = () => {
        setForceUpdate(val => val + 1)
    }

    useEffect(async()=> {

        //lembrar de usar .current!!!
        console.log('entrou no useEffect')

        if (forceUpdate > 0) {

            //Exemplo integrando uma lib em jquery!
            const calendar = new FullCalendar.Calendar(divRef.current, {
                initialView: 'dayGridMonth'
            });

            calendar.render()

        }

        //cleanup, executado antes do useEffect
        return () => {
            console.log('cleanup')
        }

    }, [forceUpdate])

    return (
        <div>
            <link href='fullcalendar/main.css' rel='stylesheet' />
            <script src='fullcalendar/main.js'></script>
            <button onClick={getRef}>Ref</button>
            <button ref={buttonRef}>Outro</button>
            <button onClick={callUpdate}>Show Calendar</button>
            <div ref={divRef}>-</div>
        </div>
    )
}

export default Index