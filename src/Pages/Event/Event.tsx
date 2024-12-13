import  { useCallback, useEffect, useState } from 'react';

import './Event.css';
import { event } from '../../types';
import { fetchCheckReg, fetchGetEvent,  fetchRegToEvent } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { QrPage } from '../QrPage/QrPage';

export const Event = ()=> {
  const [event, setEvent] = useState<event>({} as event);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isReg, setIsReg] = useState<Boolean>(false);
  const [isScanned, setIsScanned] = useState<Boolean>(false);
 const [telegramId, setTelegramId] = useState<string>(''); //124142
   const {id} = useParams()
   const navigate = useNavigate();
   const regToEvent = async () => {
    const reg:{tgId:string, eventId:string} = {
      tgId:telegramId,
      eventId:id as string
  
    }
    fetchRegToEvent(reg)
    .then(()=>checkReg())
   
  };
  


const handleEvent = useCallback(async () => {
  const data = await fetchGetEvent(id as string)
  setEvent(data)
  setLoading(true)
}, [id]); // Пустой массив зависимостей для предотвращения пересоздания



const checkReg =  useCallback(async ()=>{
  const obj = { tgId: telegramId, eventId:id as string }
const result = await fetchCheckReg(obj)

if(result.found){
  setIsReg(true)
  if(result.item.isScanned){
    setIsScanned(true)
  }
}

},[id, telegramId])


useEffect(() => {
  window.Telegram.WebApp.BackButton.show();
  // Обработчик события при нажатии на кнопку "Назад"
  window.Telegram.WebApp.BackButton.onClick(() => {
    navigate(-1);
  });
}, [navigate]);


useEffect(()=>{
  handleEvent()
},[handleEvent, loading])


useEffect(() => {

  if (window.Telegram) {
    const webApp = window.Telegram.WebApp;

    // Инициализация WebApp
    webApp.ready();

    // Получение информации о пользователе
    const user = webApp.initDataUnsafe.user;

    if (user) {
      setTelegramId(String(user.id));
      

    } else {
      console.log("Пользователь не авторизован.");
    }
  } else {
    console.warn("Telegram WebApp API недоступен.");
  }

  checkReg();


}, [checkReg, isReg]); 


if(isScanned === true){
  return(<div>
 <p className='mainTitle'>Кажется твой QR код отсканирован</p>

  </div>)
}

if(isReg === true){
return(<QrPage/>)
}

if(loading === false){
  return(<div>loading</div>)
}


return(
  <>
<div className='mainTitle'>Информация о мероприятии</div>
<div className='eventBlock'>
  <div className='headerBlock'>
  <div className='imageBlock'>
  <img className='image' src= {event.imageUrl} alt={event.title}/>
  </div>
  <p className='title'>{event.title}</p></div>
 <p className='descTitle'>{event.extDescription}</p>

 <p className='title'>Количество участников:{event.members === undefined ? 0 : event.members.length}</p>
 <button onClick={()=>regToEvent()} className='button'>Учавствовать в мероприятии</button>
</div>
</>)
}

