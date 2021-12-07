import React, { useState, useEffect } from "react";

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

    function liftData(scope: scopeState) {
        props.scopeFn(scope);
    }


    return (
        <div className='control-panel'>
            <div className='control-panel__person'>
                {(person[0].img !== '' ? <img src={person[0].img} alt="" /> : <p></p>)}
                <p>Report For</p>
                <h3>{`${person[0].name} ${person[0].lastName}`}</h3>
            </div>
            <div className='control-panel__panel'>
                <button onClick={liftData.bind('', 'daily')}>Daily</button>
                <button onClick={liftData.bind('', 'weekly')}>Weekly</button>
                <button onClick={liftData.bind('', 'monthly')}>Monthly</button>
            </div>
        </div>
    )
}

export default PersonCard;