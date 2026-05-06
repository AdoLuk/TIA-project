import React, { useEffect, useState } from "react";
import { getEventTypes } from "../services/eventService"; // predpokladaná funkcia

function EventFilters({ events, onFilterChange, setError }) {
  const [types, setTypes] = useState([]); // načítané typy z DB
  const [filters, setFilters] = useState({
    mine: false,
    ongoing: false,
    types: new Set(), // vybrané type_id
    years: new Set(), // vybrané roky
  });

  useEffect(() => {
    let mounted = true;
    getEventTypes()
      .then(res => { if (mounted) setTypes(res); })
      .catch(err => { console.error(err); setError?.(err.message); });
    return () => { mounted = false; };
  }, []);

  // volanie callbacku pri zmene filtrov
  useEffect(() => {
    const normalized = {
      mine: filters.mine,
      ongoing: filters.ongoing,
      typeIds: Array.from(filters.types),
      years: Array.from(filters.years),
    };
    onFilterChange(normalized);
  }, [filters]);

  const toggleType = (id) => {
    setFilters(prev => {
      const next = new Set(prev.types);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...prev, types: next };
    });
  };

  const toggleYear = (year) => {
    setFilters(prev => {
      const next = new Set(prev.years);
      if (next.has(year)) next.delete(year); else next.add(year);
      return { ...prev, years: next };
    });
  };

  const clearAll = () => setFilters({ mine: false, ongoing: false, types: new Set(), years: new Set() });

  // pripravi roky do selectu (napr. od 2000 do aktuálneho)
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Set(events.map(e => new Date(e.begin_date).getFullYear()))).sort();

  return (
    <div className="card p-3 mb-3">
      <div className="mb-2"><strong>Filtre</strong></div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="filter-mine" checked={filters.mine}
          onChange={e => setFilters(f => ({ ...f, mine: e.target.checked }))} />
        <label className="form-check-label" htmlFor="filter-mine">Moje</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="filter-ongoing" checked={filters.ongoing}
          onChange={e => setFilters(f => ({ ...f, ongoing: e.target.checked }))} />
        <label className="form-check-label text-break" htmlFor="filter-ongoing">Prebiehajúce</label>
      </div>

      <hr/>

      <div className="mb-1"><strong>Typ akcie</strong></div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="type-all" checked={filters.types.size === 0 || filters.types.size === types.length}
          onChange={e => setFilters(f => ({ ...f, types: new Set() }))} />
        <label className="form-check-label" htmlFor="type-all">Všetky</label>
      </div>
      {types.map(t => (
        <div className="form-check" key={t.event_type_id}>
          <input className="form-check-input" type="checkbox" id={`type-${t.event_type_id}`}
            checked={filters.types.has(t.event_type_id)}
            onChange={() => toggleType(t.event_type_id)} />
          <label className="form-check-label" htmlFor={`type-${t.event_type_id}`}>{t.type}</label>
        </div>
      ))}

      <hr/>

      <div className="mb-1"><strong>Rok</strong></div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="year-all" checked={filters.years.size === 0}
          onChange={e => setFilters(f => ({ ...f, years: new Set() }))} />
        <label className="form-check-label" htmlFor="year-all">Všetky</label>
      </div>
      {years.map(y => (
        <div className="form-check" key={y}>
          <input className="form-check-input" type="checkbox" id={`year-${y}`}
            checked={filters.years.has(y)}
            onChange={() => toggleYear(y)} />
          <label className="form-check-label" htmlFor={`year-${y}`}>{y}</label>
        </div>
      ))}

      <div className="mt-3">
        <button className="btn btn-sm btn-secondary me-2" onClick={clearAll}>Zmazať filtre</button>
      </div>
    </div>
  );
}

export { EventFilters };
