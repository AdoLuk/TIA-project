import React from "react";
import { useNavigate } from "react-router-dom";

function Block(props) {
    const navigate = useNavigate();

    return (
        <div className="row m-2 border bg-light rounded">
            <div className="col-sm">
                <div className="mb-2">
                    <b>{props.block.title}</b>
                </div>
                <div>
                    {props.block.description}
                </div>
            </div>
            <div className="col-sm-3">
                <div style={{ marginTop: '0.5rem' }}>
                    <button className="btn btn-sm btn-primary" 
                        onClick={() => navigate(`/blocks/edit`, { state: { block_id: props.block.block_id } })}>
                        Upraviť
                    </button>
                </div>
                <div>
                    <p>{props.block.begin_time} - {props.block.end_time}</p>
                </div>
                <div>
                    <em>Miesto: {props.block.place}</em>
                </div>
            </div>
        </div>
    )
}

export default Block;  