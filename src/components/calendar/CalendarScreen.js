import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { messages } from '../../helpers/calendar-messages-es'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

// Configuracion del calendario
moment.locale('es')
const localizer = momentLocalizer(moment)

const CalendarScreen = () => {

  const dispatch = useDispatch()

  const {events, activeEvent} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)

  const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'month')

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])
  
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    const fechaActual = new Date().getTime()
    console.log(typeof(fechaActual));
    const fecha = moment().format('lll')
    console.log(typeof(fecha));
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLasView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }
  return (
    <div className='calendar-screen'>
        <Navbar />

        <Calendar
          localizer={localizer}  // fecha actual
          events={events}  // array de eventos (data)
          startAccessor="start"
          endAccessor="end"
          messages={messages}  // configuraci??n de los mensajes(pasarlo al espa??ol)
          eventPropGetter={eventStyleGetter} // configuraci??n del estilo del evento del dia 
          onDoubleClickEvent={onDoubleClick} // funci??n al dar doble click
          onSelectEvent={onSelectEvent} // funci??n al dar click
          onView={onViewChange} // un change que registra si es dia-semana-mes
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lasView} // vista actual(dia-semana-mes)
          components={{ 
            event: CalendarEvent
          }} // componente del evento a mostrar
        />
        <AddNewFab />
        {
          activeEvent && <DeleteEventFab />
        }

        <CalendarModal />
    </div>
  )
}

export default CalendarScreen