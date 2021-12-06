import React, { useState, useEffect } from "react";

import './PersonCard.css'

interface PersonInfo {
    name: string;
    lastName: string;
    img: string;
}

const Dummy_Person: PersonInfo[] = [{
    name: '',
    lastName: '',
    img: '',
}]

const PersonCard: React.FC = () => {

    const [person, setPerson] = useState<PersonInfo[]>(Dummy_Person);

    useEffect(() => {
        getUserData();
        getActivityData();
    }, [])

    async function getUserData() {
        const fetchData = await fetch('https://randomuser.me/api/', {
            method: 'GET',
        });
        const bodyParse = await fetchData.json();

        const person: PersonInfo = {
            name: bodyParse.results[0].name.first,
            lastName: bodyParse.results[0].name.last,
            img: bodyParse.results[0].picture.large,
        }

        setPerson([person])
    }

    async function getActivityData() {
        const test = await fetch('/data.json');
        const res = await test.json();

        console.log(res);
    }

    return (
        <div className='control-panel'>
            <div className='control-panel__person'>
                <img src={person[0].img} alt="" />
                <img src={person[0].img} alt="" />
                <p>Report For</p>
                <h3>{`${person[0].name} ${person[0].lastName}`}</h3>
            </div>
            <div className='control-panel__panel'>

            </div>

        </div>
    )
}

export default PersonCard;