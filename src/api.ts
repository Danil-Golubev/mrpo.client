import axios from 'axios';
import { user } from './types';
export const fetchPostUser= async (req: user) => {
    const data = {
    tgId:req.tgId,
    firstName:req.firstName,
    secondName:req.secondName}
	const res = await axios.post('/reg-user', data);
	return res.data;
};  