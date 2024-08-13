import mongoose from "mongoose";

// const OrderItemsSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const OrderItemsModel = mongoose.model("OrderItem", OrderItemsSchema);

const OrderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Food",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
      },
    ],
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order created",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
