import { useState } from "react";
import { fetchPostUser } from "../../api";
import {user} from '../../types'

export const Registration = ({tgId}:{tgId:string})=>{

    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');

    
    const regPerson = async () => {
        const user:user = {
          tgId :tgId,
          firstName : firstName,
          secondName: secondName
        }
        fetchPostUser(user)
       
      };
      

return(
<div className="App">

<div className='regList'>
  <div>
<p className='mainTitle'>Регистрация на платформе</p>
</div>

  <div>
  <p>Введи имя</p>
      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
  
      <p>Введи Фамилию</p>
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button onClick={()=>regPerson()} className='button'>Зарегестрироваться</button>
      </div>
    </div>
)
}