import { useEffect, useState } from "react"
import { fetchGetEvents } from "../../api"
import './EventList.css'
import {event} from '../../types'
import { Link } from "react-router-dom"
import { EventSkeleton } from "../../components/EventSkeleton/EventSkeleton"
export const EventList =()=>{

    const [events, setEvents] = useState<event[]>([]);

    const getEvents = async ()=>{
        const data = await fetchGetEvents()

setEvents(data)
    }
    
    useEffect(()=>{
        getEvents()
        
    },[])


    if (events.length === 0) {
        return (
          <>
            <div className='list'>
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </div>
          </>
        );
      }

    return(<div>

<div className='mainTitle'>Список мероприятий</div>
<div className='mainBlock'>
        <div className='list'>
        {events.map((event:event)=>(
         <Link to={`/events/${event._id}`} key = {event._id}>
         <div className='mainBlock'>
           <div className='imageBlock'>
             <div className='image' />
           </div>
           <div className='textBlock'>
             <div className='date'>Колличество участников: {event.members.length}</div>
             <div className='title'>{event.title}</div>
           </div>
         </div>
       </Link>))}
         </div>
         </div>
    </div>)

}