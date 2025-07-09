const Product=require("../models/product");

const getAllProducts=async(req, res)=>{
    const {name, featured, company, sort, select} = req.query;
    const queryObject={};

    if(name){
        queryObject.name={$regex:name, $options:"i"};
    }
    if(company){
        queryObject.company={$regex:company, $options:"i"};
    }
    if(featured){
        queryObject.featured= featured;
    }

    let apiData=Product.find(queryObject);

    if(sort){
        let sortFix=sort.split(",").join(" ");
        apiData=apiData.sort(sortFix)
    }
    if(select){
        let selectFix=select.split(",").join(" ");
        apiData=apiData.select(selectFix)
    }


    console.log(queryObject);

    const myData=await apiData;
    res.status(200).json({ myData});
};

const getAllProductsTesting=async(req, res)=>{
    const myData=await Product.find(req.query);
    res.status(200).json({ myData})
};
const getIndItem = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
};

module.exports ={ getAllProducts, getAllProductsTesting, getIndItem };
