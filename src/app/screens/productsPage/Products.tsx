import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));



interface ProductsProps {
  onAdd: (item: CartItem) =>  void;
}

export default function Products(props: ProductsProps) {
  const { onAdd}= props;

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.WATCHES,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
  if (searchText === "") {
    productSearch.search = "";
    setProductSearch({ ...productSearch });
  }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
  productSearch.page = 1;
  productSearch.order = order;
  setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
  productSearch.search = searchText;
  setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
  productSearch.page = value;
  setProductSearch({ ...productSearch });
  };

  const chooseDishHandler =(id: string) => {history.push(`/products/${id}`);};


  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>LUXURY COLLECTION</p>
              <Stack className={"single-search-form"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant={"contained"}
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

                <Stack className={"dishes-filter-section"}>
                  <Stack className={"dishes-filter-box"}>
                    <Button
                      variant={"contained"}
                      className={"order"}
                      color={
                        productSearch.order === "createdAt" ? "primary" : "secondary"
                      }
                      onClick={() => searchOrderHandler("createdAt")}
                    >
                      New
                    </Button>
                    <Button
                      variant={"contained"}
                      className={"order"}
                      color={
                        productSearch.order === "productPrice" ? "primary" : "secondary"
                      }
                      onClick={() => searchOrderHandler("productPrice")}
                    >
                      Price
                    </Button>
                    <Button
                      variant={"contained"}
                      className={"order"}
                      color={
                        productSearch.order === "productViews" ? "primary" : "secondary"
                      }
                      onClick={() => searchOrderHandler("productViews")}
                    >
                      Views
                    </Button>
                  </Stack>
                </Stack>

                <Stack className={"list-category-section"}>
                    <Stack className={"product-category"}>
                        <div className={"category-main"}>
                            <Button
                              variant={"contained"}
                              color={
                                productSearch.productCollection === ProductCollection.WATCHES
                                  ? "primary"
                                  : "secondary"
                              }
                              onClick={() => searchCollectionHandler(ProductCollection.WATCHES)}
                              >
                              Watches
                            </Button>
                            <Button
                              variant={"contained"}
                              color={
                                productSearch.productCollection === ProductCollection.BRACELETS
                                  ? "primary"
                                  : "secondary"
                              }
                              onClick={() => searchCollectionHandler(ProductCollection.BRACELETS)}
                              >
                              Bracelets
                            </Button>
                            <Button
                              variant={"contained"}
                              color={
                                productSearch.productCollection === ProductCollection.RINGS
                                  ? "primary"
                                  : "secondary"
                              }
                              onClick={() => searchCollectionHandler(ProductCollection.RINGS)}
                              >
                              Rings
                            </Button>
                            <Button
                              variant={"contained"}
                              color={
                                productSearch.productCollection === ProductCollection.SMART_WATCHES
                                  ? "primary"
                                  : "secondary"
                              }
                              onClick={() => searchCollectionHandler(ProductCollection.SMART_WATCHES)}
                              >
                              Smart Watches
                            </Button>
                            <Button
                              variant={"contained"}
                              color={
                                productSearch.productCollection === ProductCollection.PERFUMES
                                  ? "primary"
                                  : "secondary"
                              }
                              onClick={() => searchCollectionHandler(ProductCollection.PERFUMES)}
                              >
                              Perfumes
                            </Button>
                        </div>
                    </Stack>

                    <Stack className={"product-wrapper"}>
                        {products.length !== 0 ? (
                            products.map((product: Product) => {
                              const imagePath = `${serverApi}/${product.productImages[0]}`;
                              const sizeVolume = 
                              product.productCollection === ProductCollection.WATCHES ? product.productViews + "  " : product.productSize + "size";
                                return (
                                    <Stack key={product._id} className={"product-card"}
                                    onClick={() => chooseDishHandler(product._id)}>
                                        <Stack
                                        className={"product-img"}
                                        sx={{backgroundImage: `url(${imagePath})`}}
                                        >
                                            <div className={"product-sale"}>{sizeVolume}</div>
                                            <Button className={"shop-btn"}
                                            onClick={(e) => {
                                             
                                              onAdd({
                                                _id: product._id,
                                                quantity: 1,
                                                name: product.productName,
                                                price: product.productPrice,
                                                image: product.productImages[0],
                                              });
                                              e.stopPropagation();
                                              
                                            }}>
                                            

                                                <img 
                                                src={"/icons/shopping-cart.svg"}
                                                style={{ display: "flex"}}/>
                                            </Button>
                                            <Button className={"view-btn"} sx={{right: "36px"}}>
                                            <Badge badgeContent={product.productViews} color="secondary">
                                                <RemoveRedEyeIcon
                                                sx={{
                                                    color: product.productViews === 0 ? "gray" : "white",
                                                }}
                                                />
                                            </Badge>
                                            </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {product.productPrice}
                                                </div>
                                            </Box>
                                            </Stack>
                                );
                            })
                        ) : (
                            <Box className="no-data">Products are not available!</Box>
                        )}
                    </Stack>
                </Stack>

                <Stack className={"pagination-section"}>
                  <Pagination
                    count={
                      products.length !== 0
                        ? productSearch.page + 1
                        : productSearch.page
                    }
                    page={productSearch.page}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color={"secondary"}
                      />
                    )}
                    onChange={paginationHandler}
                  />
                </Stack>
          </Stack>
        </Container>

  <div className={"brands-logo"}>
  <Container>
    <Box className={"brands-title"}>Curated Timepiece Highlights</Box>
    {/* Use a div instead of Stack to ensure CSS Grid takes full control */}
    <div className={"video-grid"}>
      <Box className={"video-box"}>
        <video src={"/video/watch1.mov"} autoPlay loop muted playsInline />
      </Box>
      <Box className={"video-box"}>
        <video src={"/video/watch2.mov"} autoPlay loop muted playsInline />
      </Box>
      <Box className={"video-box"}>
        <video src={"/video/watch3.mov"} autoPlay loop muted playsInline />
      </Box>
      <Box className={"video-box"}>
        <video src={"/video/watch4.mov"} autoPlay loop muted playsInline />
      </Box>
    </div>
  </Container>
</div>

     <div className={"address"}>
  <Container>
    <Stack className={"address-area"}>
      <Box className={"title"}>Our Boutique Location</Box>
      
      {/* This is the dedicated map section - separate from the footer */}
      <div className="map-luxury-wrapper">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6599182315663!2d-73.97824148459424!3d40.75889657932758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9679f2913%3A0x6b3014a008e5601b!2sJacob%20%26%20Co.!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
          loading="lazy"
          title="Boutique Location"
        />
      </div>
    </Stack>
  </Container>
</div>
    </div>
  );
}