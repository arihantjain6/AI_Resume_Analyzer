import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import dbConnection from "./src/db/db.js";

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});