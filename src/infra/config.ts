import {connect, set, ObjectId} from "mongoose";

export const connectToMongoDb = async () => {
  await connect(process.env.DATABASE_URL as string);
};

set('toJSON', {
  virtuals: true,
  transform: (_, res) => {
    res.id = res._id.toString()
    delete res._id
    delete res.__v
  }
});