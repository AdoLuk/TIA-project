import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { getEventTypes } from "../services/eventService";
import { getUsername } from "../services/userService";
import { useEffect, useState } from "react";
import { dateFromString, isSubstr } from "../utils/eventBlockHelpers";
import { BlockList } from "./BlockList";

function Event(props) {
    const [eventType, setEventType] = useState("");
    const [username, setUsername] = useState("");
    const [displayWhole, setDisplayWhole] = useState(false);

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

    const navigate = useNavigate();
    const start = dateFromString(props.event.begin_date);
    const end = dateFromString(props.event.end_date);
    const days = (new Date(props.event.end_date) - new Date(props.event.begin_date)) 
                 / (1000 * 60 * 60 * 24) + 1;

    return (
        <div className="m-2 p-2 border bg-light rounded">
            <div className="row">
                <div className="col-sm-2"><p> </p></div>
                <div className="mb-2 col-sm">
                    <b>{props.event.title}{!isSubstr(eventType, props.event.title) ? " (" + eventType + ")" : ""}</b>
                </div>
                <div className="col-sm-2">
                    {true ? <button className="btn btn-sm btn-secondary mt-1" 
                        onClick={() => navigate(`/events/edit`, { state: { event_id: props.event.event_id } })}>
                        Upraviť
                    </button> : null}
                </div>
            </div>
            <div className="row">
                <div className="col text-start">
                    Vedúci: {username || <em className="text-secondary">...nepodarilo sa nájsť vedúceho akcie...</em>}
                </div>
            </div>
            <div className="row">
                <div className="col text-start">
                    Trvanie od {start} do {end}, ({days} {days === 1 ? "deň" : days < 5 ? "dni" : "dní"})
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-sm btn-secondary" onClick={() => setDisplayWhole(d => !d)}>{displayWhole ? "/\\" : "\\/"}</button>
                </div>
            </div>
            {displayWhole ? 
            <div>
                <hr className="m-1"/>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm">
                        <BlockList blocks={props.blocks} setError={props.setError}></BlockList>
                    </div>
                </div>
            </div>
            : null}
        </div>
    )
}

export default Event;  