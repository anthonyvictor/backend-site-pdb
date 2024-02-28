import { LogsModel } from "../infra/mongodb/models/log";

export const log = async (error: any) => {
  try {
    await LogsModel.create({
      error: {
        date: new Date(),
        stack: (error as Error)?.stack ?? "No Stack",
        message: (error as Error).message,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
