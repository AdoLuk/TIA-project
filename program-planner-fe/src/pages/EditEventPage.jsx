import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// import {  } from "../services/blockService";
import { dateFromString, stringFromDate, timeFromString } from "../utils/eventBlockHelpers";
import { getEvents, getEventTypes, editEvent } from "../services/eventService";
import { createBlock, getBlocksByEvent } from "../services/blockService";
import { BlockList } from "../components/BlockList"


function EditEventPage(props) {
    const location = useLocation()
    const id = location.state?.event_id
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState("")
    const [saving, setSaving] = useState(false)
    const [update, setUpdate] = useState(false)
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [blocks, setBlocks] = useState([])
    const [form, setForm] = useState({
        title: "",
        event_type_id: "",
        begin_date: "",
        end_date: "",
        other_type: ""
    })

    useEffect(() => {
        getBlocksByEvent(id).then((result) => {
            // console.log("refreshing blocks: ")
            setBlocks(result)
        }).catch((err) => {
            console.log(err);
            props.setError?.(err);
        })
    }, [update])

    useEffect(() => {
        getEvents(id).then(
            (event) => {
                event = event[0]
                setTitle(event.title)
                setDate(event.begin_date)
                setForm({
                    title: event.title,
                    event_type_id: event.event_type_id,
                    begin_date: event.begin_date,
                    end_date: event.end_date
                })
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message);
            }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let mounted = true;
        getEventTypes()
        .then(res => { if (mounted) setTypes(res); })
        .catch(err => { console.error(err); props.setError?.(err.message); });
        return () => { mounted = false; };
    }, []);

    function handleValueChange(e) {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
    }

    // function handleDateChange(e) {
    //     const { name, value } = e.target
    //     setForm((s) => ({ ...s, [name]: stringFromDate(value, form[name]) }))
    // }

    function onSave(e) {
        e.preventDefault()
        props.setError(null)
        if (new Date(form.begin_date) > new Date(form.end_date)) {
            props.setError("Prosím zadajte dátum konca neskorší ako dátum začiatku!");
            setForm((s) => ({ ...s, end_date: form.begin_date }));
            return;
        }
        setSaving(true)
        editEvent(id, form).then(() => {})
            .catch ((error) => {
                console.log(error.message);
                props.setError?.(error.message);
            })
            .finally(() => {
                setSaving(false);
                navigate('/events');
            })
    }

    function createNewBlock() {
        createBlock(id, date).then(r => {}).catch(err => console.log(err)).finally(setUpdate(!update))
    }

    return (
        <div>
            <h1>Úprava eventu {title}</h1>
            <form onSubmit={onSave}>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Názov</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleValueChange}
                                placeholder="Enter event title"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Typ akcie</label>
                        </div>
                        <div className="col">
                            <select
                                className="form-control"
                                name="event_type_id"
                                value={form.event_type_id ?? ''}
                                onChange={handleValueChange}
                            >
                                <option value="" hidden>Vyber...</option>
                                {types.map(t => (
                                <option key={t.event_type_id} value={String(t.event_type_id)}>
                                    {t.type}
                                </option>
                                ))}
                                <option value="__other">Iné...</option>
                            </select>

                            {form.event_type_id === '__other' && (
                                <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Zadaj nový typ"
                                name="other_type"
                                value={form.other_type}
                                onChange={handleValueChange}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="m-3 row">
                        <div className="col-2 p-1">
                            <label>Dátum od</label>
                        </div>
                        <div className="col-4">
                            <input
                                type="date"
                                name="begin_date"
                                className="form-control"
                                value={form.begin_date.split("T")[0]}
                                onChange={handleValueChange}
                                placeholder="Enter begin date"
                            />
                        </div>
                        <div className="col-2 p-1">
                            <label>Dátum do</label>
                        </div>
                        <div className="col-4">
                            <input
                                type="date"
                                name="end_date"
                                className="form-control"
                                value={form.end_date}
                                onChange={handleValueChange}
                                placeholder="Enter end date"
                            />
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                <button type="button" onClick={() => navigate('/events')} style={{ marginLeft: 8 }}>Cancel</button>
            </form>

            <hr/>
            <h3>Úprava blokov akcie</h3>
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary rounded"
                        onClick={createNewBlock}
                    >+ pridať nový blok</button>
                </div>
            </div>
            <BlockList blocks={blocks} eventLeader={true} update={update} setUpdate={setUpdate}></BlockList>
        </div>
    
    )
}

export default EditEventPage;