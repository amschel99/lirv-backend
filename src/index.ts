import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./dbconfig/config";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { AuthRouter } from "./routes/auth";
import { verifyJwt } from "./middleware/verifyJwt";
import { verificationStatus } from "./middleware/verificationStatus";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { AuthenticatedRouter } from "./routes/authenticatedUser";
import { NotificationRouter } from "./routes/notifications";
import http from "http";
import { Server } from "socket.io";
import { createAllCommunities } from "./controllers/authenticatedRest/allcommunities";

dotenv.config();

export const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.emit("newConnection", { message: "a new client connected" });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", AuthRouter);
app.post("/createCommunities", createAllCommunities);
app.use(verifyJwt);
app.use("/api/user", AuthenticatedRouter);
app.post("/api/notifications", NotificationRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server
  .start()
  .then((data) => {
    app.get("/api/ping", (req, res) => {
      res.status(200).json(`Ping success`);
    });

    app.use(
      "/graphql",
      cors({
        methods: ["GET", "POST", "OPTIONS"],
        credentials: true,
        maxAge: 600,
        origin: "*",
      }),
      bodyParser.json(),
      cookieParser(),
      express.urlencoded(),
      express.json(),
      verifyJwt,

      expressMiddleware(server, {
        context: async ({ req, res }: any) => {
          // Log req.user

          // Return the context with optional configuration options
          return {
            user: req?.user,
            req,
            res,
          };
        },
      })
    );

    const connection_url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;

    const connectToDB = async () => {
      try {
        if (process.env.NODE_ENV === "test") {
          return null;
        }
        if (process.env.NODE_ENV === "remote") {
          await connectDb(
            process.env.REMOTE_MONGO ?? "mongodb://localhost:27017/mydatabase"
          );
          console.log("DB connected successfully! yes");
          httpServer.listen(process.env.PORT, () => {
            console.log(`Server up and running on ${process.env.PORT}`);
          });
          return;
        }

        await connectDb("mongodb://localhost:27017/mydatabase");
        console.log("DB connected successfully");
        const used = process.memoryUsage();
        console.log(`Heap memory used ${JSON.stringify(used)}`);
        httpServer.listen(process.env.PORT, () => {
          console.log(`Server up and running on ${process.env.PORT} on Docker`);
        });
      } catch (err: any) {
        console.log(
          `Connection on ${process.env.REMOTE_MONGO} failed: ${err.message}`
        );
        console.log("Retrying connection...");

        setTimeout(connectToDB, 5000);
      }
    };

    connectToDB();
  })
  .catch((e) => {
    console.log(`there was a bug`);
  });
