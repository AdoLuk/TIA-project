import Event from "./Event";
import { use, useEffect, useState } from "react";

function EmptyEventList() {
    return <div className="row">
            <div className="col">
              <div className="py-3">
                  Nenašli sa žiadne akcie.
              </div>
            </div>
          </div>;
  }

  
function EventList({events, setError}) {
  const [eventList, setEventList] = useState(events.map((event) => <Event key={event.event_id} event={event} setError={setError}></Event>));
  useEffect(() => {
    setEventList(events.map((event) => <Event key={event.event_id} event={event} setError={setError}></Event>));
  }, [events])
  let emptyEventList =  <EmptyEventList></EmptyEventList>;

  return eventList.length>0 ? eventList : emptyEventList;
}

export { EventList };