import mongoose from "mongoose";
import { Password } from "../utils/password";

// An interface that describes the properties
// in order to create a new User
interface IUser {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User model has.
interface UserModel extends mongoose.Model<UserDocument> {
  build({ email, password }: IUser): UserDocument;
}

// An interface that describes the properties
// that a User document has.
interface UserDocument extends mongoose.Document<any> {
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Function that enforces typescript rules:
userSchema.statics.build = ({ email, password }: IUser) => {
  return new User({ email, password });
};

// Function that guarantee the hasing of the password:
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.hashPassword(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
