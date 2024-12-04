import axios from 'axios';
import { user } from './types';
export const fetchPostUser= async (req: user) => {
    const data = {
    tgId:req.tgId,
    firstName:req.firstName,
    secondName:req.secondName}
	const res = await axios.post('http://localhost:4444/reg-user', data);
	return res.data;
};  


export const fetchCheckReg= async (req:any) => {
	const res = await axios.post('http://localhost:4444/bytgId', req);
	return res.data;
};  