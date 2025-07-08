const express =require("express")
const upload = require("../upload"); 
const Product = require("../models/product");
const {getAllProducts, getAllProductsTesting}=require("../controllers/products")
const router = express.Router();

router.route("/").get(getAllProducts)
router.route("/testing").get(getAllProductsTesting)


router.post("/upload", upload.array("images", 5), async (req, res) => {
  try {
    const { name, price, company, colors } = req.body;

    if (!req.files || req.files.length < 4) {
      return res.status(400).json({ error: "Upload exactly 5 images." });
    }

    const allImages = req.files.map(file => file.path); 

    const newProduct = await Product.create({
      name,
      price,
      company,
      colors: JSON.parse(colors),
      image: allImages[0],        
      images: allImages.slice(1)  
    });

    res.status(201).json({ product: newProduct });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});


module.exports = router;