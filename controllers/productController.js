const productService = require("../services/productService");

const newLookUp = async (req, res) => {
  const newProduct = await productService.LookUpNew();
  res.status(200).json({ newProduct: newProduct });
};

const recommendLookUp = async (req, res) => {
  const decoded = await req.body.decoded;
  const recommendProduct = await productService.lookUpRecommend(decoded);
  res.status(200).json({ recommendProduct: recommendProduct });
};

const randomLookUp = async (req, res) => {
  const randomProduct = await productService.randomLookUp();
  res.status(200).json({ randomProduct: randomProduct });
};

const productColor = async (req, res) => {
  const productId = req.params.productId;
  const colorId = req.params.colorId;
  const productColorUrl = await productService.productColorLookUp(
    productId,
    colorId
  );
  res.status(200).json({ productColorUrl: productColorUrl });
};

const getProductDetail = async (req, res) => {
  const { productId } = req.params;
  const [products] = await productService.getProductDetailByproductId(
    productId
  );
  return res.status(200).json({ products: products });
};

module.exports = {
  productColor,
  newLookUp,
  recommendLookUp,
  randomLookUp,
  getProductDetail,
};
