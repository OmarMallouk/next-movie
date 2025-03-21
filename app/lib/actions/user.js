import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createUserOrUpdate = async (
    id,
    first_name,
    last_name,
    image_url,
    email_address
) => {
    try {
        await connect();
        console.log("Saving to MongoDB:", { id, first_name, last_name, image_url, email_address });

        // Check if email_address is provided and valid
        const email = email_address && email_address[0] && email_address[0].email_address 
            ? email_address[0].email_address 
            : "default@hotmail.com"; // Fallback to default email if none is provided

        const user = await User.findOneAndUpdate(
            { clerkId: id }, // Use `findOneAndUpdate` instead of `findByIdAndUpdate`
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    profilePicture: image_url,
                    email: email, // Use the validated email
                },
            },
            {
                upsert: true, // Creates a new user if not found
                new: true, // Returns the updated document
            }
        );

        console.log("MongoDB Save Success:", user);
        return user;
    } catch (err) {
        console.log("Error: cannot create or update user", err);
        throw err;
    }
};

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({ clerkId: id });
    } catch (err) {
        console.log("Error: cannot delete user", err);
        throw err;
    }
};
