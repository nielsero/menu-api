import mongoose from "mongoose";
import { MONGO_URI } from "@/config/constants";
import { logger } from "@/utils/logger";

export const mongoConnect = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_URI as string, { retryWrites: true, w: "majority" });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error(`[mongoConnect] ${error.message}`);
    return false;
  }
};
