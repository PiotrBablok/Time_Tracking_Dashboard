import React, { useEffect, useState } from "react";

import data from './data.json'
import { scopeState } from '../../utilities/ScopeState' // TS type

import './PersonActivities.css'

interface ActivitiesState {
    title: string;
    timeframes: {
        daily: {
            current: number | null;
            previous: number | null;
        },
        weekly: {
            current: number | null,
            previous: number | null;
        },
        monthly: {
            current: number | null;
            previous: number | null;
        }
    }
}

interface PersonActivitiesProps {
    newScope: 'daily' | 'weekly' | 'monthly';
}

const PersonActivities: React.FC<PersonActivitiesProps> = (props) => {

    const [activities, setActivities] = useState<ActivitiesState[]>([])


    useEffect(() => {
        getActivityData();
    }, [])


    async function getActivityData() {
        setActivities(data);
    }

    function timeScope(el: ActivitiesState, target: scopeState) {
        const interval = (target === 'daily' ? 'Day' : (target === 'weekly' ? 'Week' : 'Month'))
        console.log(el);
        return (
            <div className='activities__holder' key={el.title}>
                <div className={`activities__holder-${el.title} activities__holder-all`} id={el.title}>
                    <div className='activities__holder-data'>
                        <p>{el.title}</p>
                        <p>...</p>
                        <p>{el.timeframes[target].current}hrs</p>
                        <p>Last {interval} - {el.timeframes[target].previous}hrs</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id='activities' className='activities'>
            {
                activities.map(el => {
                    return (timeScope(el, props.newScope))
                })
            }
        </div>
    )

}

export default PersonActivities;