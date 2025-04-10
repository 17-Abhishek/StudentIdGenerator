
import { createServer } from "http";
import { storage } from "./storage.js";

export async function registerRoutes(app) {
  const httpServer = createServer(app);
  return httpServer;
}
