import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
// Create new Order  =>   /api/v1/orders/new

export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  res.status(201).json({ order });
});

// Get current user orders   =>  /api/v1/me/orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  //   if (!orders) {
  //     return next(new ErrorHandler("The user has no orders", 404));
  //   }
  res.status(200).json({ orders });
});

// Get order details   =>  /api/v1/orders/:id
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  res.status(200).json({ order });
});

// Get all orders - ADMIN  =>  /api/v1/admin/orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({ orders });
});

// Update order   =>  /api/v1/admin/orders/:id
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order?.orderItems?.forEach(async (item) => {
    console.log(">>>check item: ", item);
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    if (product.stock < item.quantity) {
      return next(
        new ErrorHandler(
          `The product is not available in sufficient quantity ${product.stock}`
        ),
        404
      );
    }
    product.stock = product.stock - item.quantity;
    await product.save();
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({ success: true });
});
// Delete order  =>  /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
