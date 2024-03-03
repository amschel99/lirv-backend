import User from "../models/userAuth";

export const updateProfile = async (profileDetails, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(user, profileDetails, {
      new: true,
    });
    console.log(`Updated user:${updatedUser}`);
    return updatedUser;
  } catch (e) {
    console.log(`Update error:${e}`);
    return null;
  }
};
