import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// import {  } from "../services/blockService";
import { timeFromString } from "../utils/eventBlockHelpers";
import { getEvents, getEventTypes } from "../services/eventService";
import { getBlocksByEvent } from "../services/blockService";
import { BlockList } from "../components/BlockList"


function EditEventPage(props) {
    const location = useLocation()
    const id = location.state?.event_id
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [saving, setSaving] = useState(false)
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [blocks, setBlocks] = useState([])
    const [form, setForm] = useState({
        title: "",
        event_type_id: "",
        begin_date: "",
        end_date: ""
    })

    useEffect(() => {
        getBlocksByEvent(id).then((result) =>
            setBlocks(result)
        ).catch((err) => {
            console.log(err);
            props.setError?.(err);
        })
    }, [])

    useEffect(() => {
        getEvents(id).then(
            (event) => {
                event = event[0]
                setTitle(event.title)
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
        .catch(err => { console.error(err); setError?.(err.message); });
        return () => { mounted = false; };
    }, []);

    function handleBlockChange(e) {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
    }

    function onSave(e) {
        e.preventDefault()
        setSaving(true)
        setError(null)
        editBlock(id, form).then(() => {navigate('/blocks')})
            .catch ((error) => {
                console.log(error.message);
                props.setError(error.message);
            })
            .finally(() => {
                setSaving(false)
            })
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
                                onChange={handleBlockChange}
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
                                value={form.event_type_id ?? ''}
                                onChange={()=>{}}
                            >
                                <option value="">Vyber...</option>
                                {types.map(t => (
                                <option key={t.event_type_id} value={String(t.event_type_id)}>
                                    {t.type}
                                </option>
                                ))}
                                <option value="__other">Iné</option>
                            </select>

                            {form.event_type_id === '__other' && (
                                <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Zadaj nový typ"
                                value={otherType}
                                onChange={handleOtherChange}
                                />
                            )}
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="place"
                                className="form-control"
                                value={form.place}
                                onChange={handleBlockChange}
                                placeholder="Enter block type"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Dátum od</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="begin_time"
                                className="form-control"
                                value={form.begin_date}
                                onChange={handleBlockChange}
                                placeholder="Enter begin date"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Dátum do</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="end_time"
                                className="form-control"
                                value={form.end_date}
                                onChange={handleBlockChange}
                                placeholder="Enter end date"
                            />
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                <button type="button" onClick={() => navigate('/blocks')} style={{ marginLeft: 8 }}>Cancel</button>
            </form>

            <hr/>
            <h3>Úprava blokov akcie</h3>
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary rounded">+ pridať nový blok</button>
                </div>
            </div>
            <BlockList blocks={blocks}></BlockList>
        </div>
    
    )
}

export default EditEventPage;