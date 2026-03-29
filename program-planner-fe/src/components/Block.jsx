function Block(props) {
    
    return (
        <div className="row mb-5 mt-5">
            <div className="col-sm">
                <div className="mb-2">
                    <b>{props.block.title}</b>
                </div>
                <div>
                    {props.block.description}
                </div>
            </div>
            <div className="col-sm-3">
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