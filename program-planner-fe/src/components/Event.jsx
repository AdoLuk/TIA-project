import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { getEventTypes } from "../services/eventService";
import { getUsername } from "../services/userService";
import { useEffect, useState } from "react";
import { dateFromString, isSubstr } from "../utils/eventBlockHelpers";
import { BlockList } from "./BlockList";

function Event(props) {
    const navigate = useNavigate();
    const [displayWhole, setDisplayWhole] = useState(false);
    const e = props.event;
    const start = dateFromString(e.begin_date);
    const end = dateFromString(e.end_date);
    const days = (new Date(e.end_date) - new Date(e.begin_date)) 
                 / (1000 * 60 * 60 * 24) + 1;

    return (
        <div className="m-2 p-2 border bg-light rounded">
            <div className="row">
                <div className="col-sm-2"><p> </p></div>
                <div className="mb-2 col-sm">
                    <b>{e.title}{!isSubstr(e.event_type, e.title) ? " (" + e.event_type + ")" : ""}</b>
                </div>
                <div className="col-sm-2">
                    {e.isMyEvent ? <button className="btn btn-sm btn-secondary mt-1" 
                        onClick={() => navigate(`/events/edit`, { state: { event_id: props.event.event_id } })}>
                        Upraviť
                    </button> : null}
                </div>
            </div>
            <div className="row">
                <div className="col text-start">
                    Vedúci: {e.username || <em className="text-secondary">...nepodarilo sa nájsť vedúceho akcie...</em>}
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