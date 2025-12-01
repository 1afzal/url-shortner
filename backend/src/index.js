import express from "express";
const app = express();
import urlRouter from "../routes/urlRoutes.js";
import connectDB from "./connectDB.js";
app.use(express.json());

const PORT = process.env.PORT || 6969;

connectDB(); //connect to mongoDB

app.use((req, res, next) => {
    console.log(`Debug: ${req.method} ${req.url}`);
    next();
});

app.use('/url', urlRouter);

app.listen(PORT, () => {
    console.log(`Debug: Server live at port ${PORT}`);
});
