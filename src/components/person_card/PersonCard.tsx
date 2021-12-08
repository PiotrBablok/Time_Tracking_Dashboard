import React, { useRef, useState, useEffect } from "react";

import './PersonCard.css'

import { scopeState } from '../../utilities/ScopeState' // TS type

interface PersonInfoState {
    name: string;
    lastName: string;
    img: string;
}

interface PersonCardProps {
    scopeFn: (newScope: scopeState) => void;
}

const Dummy_Person: PersonInfoState[] = [{
    name: '',
    lastName: '',
    img: '',
}]

const PersonCard: React.FC<PersonCardProps> = (props) => {
    const [person, setPerson] = useState<PersonInfoState[]>(Dummy_Person);
    const buttonsRef = useRef<HTMLButtonElement[]>([])
    buttonsRef.current = []

    useEffect(() => {
        getUserData();
    }, [])

    async function getUserData() {
        const fetchData = await fetch('https://randomuser.me/api/', {
            method: 'GET',
        });

        const bodyParse = await fetchData.json();

        const person: PersonInfoState = {
            name: bodyParse.results[0].name.first,
            lastName: bodyParse.results[0].name.last,
            img: bodyParse.results[0].picture.large,
        }

        setPerson([person])
    }

    function getRefEl(el: HTMLButtonElement) {
        if (el && !buttonsRef.current.includes(el)) {
            buttonsRef.current.push(el);
        }

        console.log(buttonsRef.current)
    }

    function buttonClickHandler(el: React.MouseEvent) {
        props.scopeFn(el.currentTarget.id as scopeState);
        setActiveScope(el.currentTarget.id);
    }

    function setActiveScope(id: string) {
        buttonsRef.current.forEach(el => el.style.color = '');
        buttonsRef.current.forEach(el => {
            if (el.id === id)
                el.style.color = 'white';
        });
    }

    return (
        <div className='control-panel'>
            <div className='control-panel__person'>
                {(person[0].img !== '' ? <img src={person[0].img} alt="" /> : <p></p>)}
                <p>Report For</p>
                <h3>{`${person[0].name} ${person[0].lastName}`}</h3>
            </div>
            <div className='control-panel__panel'>
                <button ref={getRefEl} style={{ color: 'white' }} id='daily' onClick={buttonClickHandler.bind(this)}>Daily</button>
                <button ref={getRefEl} id='weekly' onClick={buttonClickHandler.bind(this)}>Weekly</button>
                <button ref={getRefEl} id='monthly' onClick={buttonClickHandler.bind(this)}>Monthly</button>
            </div>
        </div>
    )
}

export default PersonCard;