import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { getEventTypes } from "../services/eventService";
import { getUsername } from "../services/userService";
import { useEffect, useState } from "react";
import { isSubstr } from "../utils/eventHelpers";

function Event(props) {
    const [eventType, setEventType] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        getEventTypes(props.event.event_type_id).then((eventType) => {
            setEventType(eventType);
        }).catch((error) => {
            console.log(error.message);
            props.setError(error.message);
        });
    }, [])

    useEffect(() => {
        getUsername(props.event.team_member_id).then((username) => {
            setUsername(username);
        }).catch((error) => {
            console.log(error.message);
            props.setError(error.message);
        });
    }, [])

    const start = props.event.begin_date.split('T')[0].split('-').reverse().join('.');
    const end = props.event.end_date.split('T')[0].split('-').reverse().join('.');
    const days = (new Date(props.event.end_date) - new Date(props.event.begin_date)) 
                 / (1000 * 60 * 60 * 24) + 1;

    return (
        <div className="m-2 p-2 border bg-light rounded">
            <div className="row">
                <div className="mb-2">
                    <b>{props.event.title} {!isSubstr(eventType, props.event.title) ? "(" + eventType + ")" : ""}</b>
                </div>
            </div>
            <div className="row text-start">
                <div>
                    Vedúci: {username || <em className="text-secondary">...nepodarilo sa nájsť vedúceho akcie...</em>}
                </div>
                <div>
                    Trvanie od {start} do {end}, ({days} {days === 1 ? "deň" : days < 5 ? "dni" : "dní"})
                </div>
            </div>
        </div>
    )
}

export default Event;  