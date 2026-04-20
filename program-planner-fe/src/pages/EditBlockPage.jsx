import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getBlocks, editBlock } from "../services/blockService";


function EditBlockPage(props) {
    const location = useLocation()
    const id = location.state?.block_id
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        title: '',
        place: '',
        begin_time: '',
        end_time: '',
        description: ''
    })
    
    useEffect(() => {
        getBlocks(id).then(
            (block) => {
                block = block[0]
                setTitle(block.title)
                setForm({
                    title: block.title,
                    place: block.place,
                    begin_time: block.begin_time,
                    end_time: block.end_time,
                    description: block.description
                })
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    function handleBlockChange(e) {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
    }

    function onSave(e) {
        e.preventDefault()
        setSaving(true)
        setError(null)
        editBlock(id, form).then(() => {navigate('/blocks')})
            .catch ((e) => {
                console.error(e)
                setError(e.message)
            })
            .finally(() => {
                setSaving(false)
            })
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Edit Block {title}</h1>
            <form onSubmit={onSave}>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Title</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleBlockChange}
                                placeholder="Enter block title"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Place</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="place"
                                className="form-control"
                                value={form.place}
                                onChange={handleBlockChange}
                                placeholder="Enter block place"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Begin time</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="begin_time"
                                className="form-control"
                                value={form.begin_time}
                                onChange={handleBlockChange}
                                placeholder="Enter begin time"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>End time</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="end_time"
                                className="form-control"
                                value={form.end_time}
                                onChange={handleBlockChange}
                                placeholder="Enter end time"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row m-3">
                        <div className="col-2 p-1">
                            <label>Description</label>
                        </div>
                        <div className="col">
                            <textarea
                                name="description"
                                className="form-control"
                                value={form.description}
                                onChange={handleBlockChange}
                                placeholder="Enter block description"
                                rows={6}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                <button type="button" onClick={() => navigate('/blocks')} style={{ marginLeft: 8 }}>Cancel</button>
            </form>
        </div>
    
    )
}

export default EditBlockPage;