import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createUserOrUpdate = async (
    id,
    first_name,
    last_name,
    image_url,
    email_address,
) => {
    try {
        await connect();
        const user = await User.findByIdAndUpdate({clerkId: id}, {
            $set: {
                firstName: first_name,
                lastName: last_name,
                profilePicture: image_url,
                email: email_address[0].email_address,
            },
            clerkId: id,
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            email: email_address,
        },
        {
            upsert: true,
            new: true,
        });
        return user;
    } catch (err) {
        console.log("Error: cannot create of update user", err);
        throw err;
    }
}

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({clerk: id});
    }
    catch (err) {
        console.log("Error: cannot delete user", err);
        throw err;
    }
};