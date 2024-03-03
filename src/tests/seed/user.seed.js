import bcrypt from 'bcryptjs'
import { ObjectId } from 'bson'
const dummyBusiness= new ObjectId("64889ac16f77250c1626b56c")
export default [
{
    email:"kariukiamschel9@gmail.com",
    password:await bcrypt.hash("@iamLehcsma9", 10),
    verified:false,
    _id:new ObjectId("658cdd86577f15920dd6ebcc")
},
{
    email:"art68401@gmail.com",
    password:await bcrypt.hash("@iamLehcsma9", 10),
    verified:true,
    _id:dummyBusiness
}

]