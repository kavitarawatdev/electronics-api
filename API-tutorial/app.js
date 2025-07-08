require("dotenv").config();
const express = require("express");
const connectDB=require("./db/connect")
const products_routes=require("./routes/products")

const app = express();

const PORT =  process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.use("/api/products",products_routes )


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()
