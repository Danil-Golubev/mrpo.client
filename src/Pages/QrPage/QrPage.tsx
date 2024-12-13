import { QRCodeCanvas } from "qrcode.react"
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCheckReg } from "../../api";

export const QrPage = ()=>{


  const [isReg, setIsReg] = useState<Boolean>(false);
  const [isScanned, setIsScanned] = useState<Boolean>(false);
 const [telegramId, setTelegramId] = useState<string>(''); //124142
   const {id} = useParams()



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
  

  const getData =()=>{
  // Убедимся, что Telegram WebApp доступен
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
  }
  getData()
  const interval  = setInterval(() => {
    getData()
  
  }, 3*1000);
  return ()=>clearInterval(interval)

}, [checkReg, isReg]); 



if(isScanned){
    return(<div className='mainTitle'>твой QR код отсканирован</div>)
}
    return(
    <div className="App">
        {/* <div>Helo fren: {username}</div> Отображаем username */}
        <div className='regList'>
        <p className='mainTitle'>Привет! покажи этот QR код на входе</p>
   
        <div className='mainBlock'>
            <QRCodeCanvas value={[telegramId,id as string]} size={200} /> 
         
        </div>
        </div>
      </div>
  )
}