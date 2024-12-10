import axios from 'axios';
import { user } from './types';
export const fetchPostUser= async (req:{ user:user, event:{id:string}}) => {
    // const data = {
    // tgId:req.user.tgId,
    // firstName:req.user.firstName,
    // secondName:req.user.secondName}
	const res = await axios.post('https://mrpo-backend.onrender.com/reg-user', req);
	return res.data;
};  


export const fetchCheckReg= async (req:{tgId:string, id:string}) => {
	const res = await axios.post('https://mrpo-backend.onrender.com/checkUserInEvent', req);
	return res.data;
};  


export const fetchGetEvents= async () => {
	const res = await axios.get('https://mrpo-backend.onrender.com/events');
	return res.data;
};  

export const fetchGetEvent= async (id:string) => {
	const res = await axios.get(`https://mrpo-backend.onrender.com/events/${id}`);
	return res.data;
};  