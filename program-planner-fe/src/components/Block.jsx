import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dateFromString, timeFromString, isSubstr } from "../utils/eventBlockHelpers";

function Block(props) {
    const navigate = useNavigate();
    
    return (
        <div className="p-3 pt-1 m-2 border rounded" style={{ backgroundColor: '#ddd' }}>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm">
                    <b>{props.block.title}{!isSubstr(props.block.block_type, props.block.title) ? " (" + props.block.block_type + ")" : ""}</b>
                    {<p className="m-0"><em>({props.block.event_title})</em></p>}
                </div>
                <div className="col-sm-2 align-middle">
                    {props.block.isMyBlock ? <button className="btn btn-sm btn-secondary mt-1" 
                        onClick={() => navigate(`/blocks/edit`, { state: { block_id: props.block.block_id } })}>
                        Upraviť
                    </button> : null}
                </div>
            </div>
            <hr className="m-0 mb-2"/>
            <div className="row">
                <div className="col-sm-4 text-start">
                    <em>Dátum: {dateFromString(props.block.date)}</em>
                </div>
                <div className="col-sm-4">
                    <p>{timeFromString(props.block.begin_time)} - {timeFromString(props.block.end_time)}</p>
                </div>
                <div className="col-sm-4 text-end">
                    <em>Miesto: {props.block.place}</em>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    {props.block.description}
                </div>
            </div>
        </div>
    )
}

export default Block;  