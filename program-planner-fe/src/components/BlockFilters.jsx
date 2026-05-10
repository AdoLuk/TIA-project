import React, { useEffect, useState } from "react";
import { getBlockTypes } from "../services/blockService"; // predpokladaná funkcia

function BlockFilters({ blocks, onFilterChange, setError }) {
  const [types, setTypes] = useState([]); // načítané typy z DB
  const [filters, setFilters] = useState({
    mine: false,
    ongoing: false,
    types: new Set(), // vybrané type_id
  });

  useEffect(() => {
    let mounted = true;
    getBlockTypes()
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

  const clearAll = () => setFilters({ mine: false, ongoing: false, types: new Set() });

  // pripravi roky do selectu (napr. od 2000 do aktuálneho)
  const currentYear = new Date().getFullYear();

  return (
    <div className="card p-3 mb-3">

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

      <div className="mb-1"><strong>Typ bloku</strong></div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="type-all" checked={filters.types.size === 0 || filters.types.size === types.length}
          onChange={e => setFilters(f => ({ ...f, types: new Set() }))} />
        <label className="form-check-label" htmlFor="type-all">Všetky</label>
      </div>
      {types.map(t => (
        <div className="form-check" key={t.block_type_id}>
          <input className="form-check-input" type="checkbox" id={`type-${t.block_type_id}`}
            checked={filters.types.has(t.block_type_id)}
            onChange={() => toggleType(t.block_type_id)} />
          <label className="form-check-label text-break" htmlFor={`type-${t.block_type_id}`}>{t.type}</label>
        </div>
      ))}

      <hr/>

      <div className="mt-3">
        <button className="btn btn-sm btn-secondary me-2" onClick={clearAll}>Zmazať filtre</button>
      </div>
    </div>
  );
}

export { BlockFilters };
