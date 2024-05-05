import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
// Get all Products  => /api/v1/products
export const getProducts = catchAsyncError(async (req, res) => {
  const resPerPage = 4;
  console.log(">>check data");
  const apiFilters = new APIFilters(Product, req.query).search().filter();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;
  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();
  await res.status(200).json({
    filteredProductsCount,
    products,
    resPerPage,
  });
});

// Create new Product   => /api/v1/admin/products
export const newProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// Get signle Product details   => /api/v1/products/:id
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
});

// Update Product details   => /api/v1/products/:id
export const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});
// Delete Product details   => /api/v1/products/:id
export const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  await product.deleteOne();

  res.status(200).json({
    message: "Product deleted",
  });
});

// Create/Update product review  =>  /api/v1/reviews
export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };
  console.log("check review", review);

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  console.log(">>>check length: ", product.reviews.length);
  console.log(">>>check product: ", product.reviews);
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.numOfReviews;
  await product.save();

  res.status(200).json({
    success: true,
  });
});

// Get product reviews  =>  /api/v1/reviews
export const getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found"), 404);
  }

  res.status(200).json({ reviews: product.reviews });
});

// Delete Product review  =>  /api/v1/reviews
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product.reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?.id?.toString()
  );

  product.numOfReviews = product.reviews.length;
  if (product.numOfReviews === 0) {
    product.ratings = 0;
  } else {
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numOfReviews;
  }

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});
