import axios from 'axios';
import { user } from './types';
export const fetchPostUser= async (req: user) => {
    const data = {
    tgId:req.tgId,
    firstName:req.firstName,
    secondName:req.secondName}
	const res = await axios.post('https://mrpo-backend.onrender.com/reg-user', data);
	return res.data;
};  


export const fetchCheckReg= async (req:any) => {
	const res = await axios.post('https://mrpo-backend.onrender.com/bytgId', req);
	return res.data;
};  


export const fetchGetEvents= async () => {
	const res = await axios.get('http://localhost:4444/events');
	return res.data;
};  