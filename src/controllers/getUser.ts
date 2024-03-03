import User from "../models/userAuth";
export const getUser = async (email: string) => {
  try {
    console.log(email);
    const user = await User.findOne({ email:email.startsWith('"')?JSON.parse(email):email });
    console.log(`The user is ${JSON.stringify(user)}`);
    return user;
  } catch (e: any) {
    console.log(e?.message);
  }
};
