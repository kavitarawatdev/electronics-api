require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB=require("./db/connect")
const products_routes=require("./routes/products")

const app = express();

const PORT =  process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-site.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ 2. Add JSON parser (just in case)
app.use(express.json());

// ✅ 3. THEN apply your routes
app.use("/api/products", products_routes);
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,'0.0.0.0', () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()
