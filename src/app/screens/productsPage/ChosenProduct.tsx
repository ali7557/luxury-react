/* eslint-disable jsx-a11y/alt-text */
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import Divider from "../../components/divider";
import ProductService from "../../services/ProductService";
import { retrieveChosenProduct } from "./selector";
import { setChosenProduct } from "./slice";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);




interface ChosenProductsProps {
  onAdd: (item: CartItem) =>  void;
}



export default function ChosenProduct(props: ChosenProductsProps) {
 const {onAdd} = props;
  const { productId } = useParams<{ productId: string }>();
  const { setChosenProduct } = actionDispatch(useDispatch());
  const {chosenProduct} =useSelector(chosenProductRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));


  }, []);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map(
              (ele: string, index: number) => {
                const imagePath = `${serverApi}/${ele}`
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"stock-count"}>{chosenProduct?.productLeftCount}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc? chosenProduct?.productDesc : "No Description"}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained"
              onClick={(e) => {
                                             
                                              onAdd({
                                                _id: chosenProduct._id,
                                                quantity: 1,
                                                name: chosenProduct.productName,
                                                price: chosenProduct.productPrice,
                                                image: chosenProduct.productImages[0],
                                              });
                                              e.stopPropagation();
                                              
                                            }}  
              
              
              
              >Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
