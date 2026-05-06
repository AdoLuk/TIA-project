import { EventList } from "../components/EventList";
import { use, useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import { EventFilters } from "../components/EventFilters";

function EventsPage(props) {

  const [events, setEvents] = useState([]);  
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    getEvents().then(
      (events) => {
        setEvents(events);
        setFilteredEvents(events);
      }
    ).catch((error) => {
      console.log(error.message);
      props.setError(error.message);
    });
    setFilteredEvents(events)

    const fetchEventsInterval = setInterval(() => {
        getEvents().then(
          (events) => {
            setEvents(events)
          }
        ).catch((error) => {
          console.log(error.message);
          props.setError(error.message);
        });
      }, 10000);
    return () => clearInterval(fetchEventsInterval);
  }, []);

  useEffect(() => {
    setFilteredEvents(events)
  }, [])

  const onFilterChange = (filters) => {
    setFilteredEvents(() => {
      if (!filters) return [...events];
      const now = new Date()
      return events.filter(e => {
        if (filters.mine && e.team_member_id !== props.myId) return false
        if (filters.ongoing && now > new Date(e.end_date)) return false
        if (filters.typeIds.length > 0 && !filters.typeIds.includes(e.event_type_id)) return false
        if (filters.years.length > 0 && !filters.years.includes(new Date(e.begin_date).getFullYear())) return false
        
        return true
      })
    });
  }
 
  return (
      <>
          <div className="row">
              <div className="col-sm-3">
                Filtre:
                <EventFilters events={events} setError={props.setError} onFilterChange={onFilterChange}></EventFilters>
              </div>
              <div className="col">
                Akcie:
                <EventList events={filteredEvents} setError={props.setError}></EventList> 
              </div>
          </div>
      </>
    );
}

export default EventsPage;