import { useEffect, useState } from "react"
import { fetchGetEvents } from "../../api"
import style from './EventList.module.css'
import {event} from '../../types'

import { EventSkeleton } from "../../components/EventSkeleton/EventSkeleton"
import { EventBlock } from "../../components/EventBlock/EventBlock"
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
         <div className={style.list}>
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </div>
          </>
        );
      }

    return(<div>

<div className={style.mainTitle}>Список мероприятий</div>

        <div className={style.list}>
        {events.map((event:event)=>(
    <EventBlock imageUrl={event.imageUrl} _id={event._id} title={event.title} description={event.description} members={[]} extDescription={""}/>
      ))}
         </div>
 
    </div>)

}