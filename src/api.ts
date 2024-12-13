import axios from 'axios';
import { user } from './types';

const URL = 'https://mrpo-backend.onrender.com'
export const fetchPostUser= async (req:user) => {
	const res = await axios.post('https://mrpo-backend.onrender.com/reg-user', req);
	return res.data;
};  


export const fetchCheckReg= async (req:{tgId:string, eventId:string}) => {
	const res = await axios.post(`${URL}/checkUserInEvent`, req);
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

export const fetchGetIsReg= async (req:{tgId:string}) => {
	const res = await axios.post(`${URL}/isReg`, req);
	return res.data;
};  

export const fetchRegToEvent= async (req:{tgId:string, eventId:string}) => {
	const res = await axios.post(`${URL}/reg-toevent`, req);
	return res.data;
};  