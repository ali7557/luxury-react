import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  const deleteOrderHandler = async (e: any, orderId: string) => {
    try {
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete this order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        
        // Hide the element locally for instant UI response
        const element = e.target.closest('.order-main-box');
        if (element) {
          element.style.display = 'none';
        }
        // Keep setOrderBuilder for full consistency on next load
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} className={"order-main-box"}>
            {/* Scrollable list of items */}
            <Box className={"order-box-scroll"}>
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id
                )[0];
                
                const imagePath = product?.productImages?.[0] 
                  ? `${serverApi}/${product.productImages[0]}` 
                  : "/img/kebab.webp";

                return (
                  <Box key={item._id} className={"orders-name-price"}>
                    <img src={imagePath} className="order-dish-img" alt="dish" />
                    <p className="title-dish">{product?.productName}</p>
                    <Box className="price-box">
                      <p>${item.itemPrice}</p>
                      <img src={"/icons/close.svg"} alt="close" />
                      <p>{item.itemQuantity}</p>
                      <img src="/icons/pause.svg" alt="pause" />
                      <p style={{ marginLeft: "15px" }}>
                        ${item.itemQuantity * item.itemPrice}
                      </p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Footer with totals and the Delete button */}
            <Box className={"total-price-box"}>
              <Box className={"box-total"}>
                <p>Product price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} alt="plus" />
                <p>Delivery cost</p>
                <p>${order.orderDelivery}</p>
                <img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} alt="pause" />
                <p>Total</p>
                <p>${order.orderTotal}</p>
              </Box>

              <button 
                className="cancel-button" 
                style={{ cursor: "pointer", padding: "5px 15px", marginLeft: "20px" }}
                onClick={(e) => deleteOrderHandler(e, order._id)}
              >
                Delete
              </button>
            </Box>
          </Box>
        ))}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} alt="no orders" />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}