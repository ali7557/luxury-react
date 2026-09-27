import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";

//**REDUX SLICE & SELECTOR
const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ newDishes })
);

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className="new-products-frame">
      <Container maxWidth={false} className="new-collection-container">
        <Stack className="main">
          <Box className="category-title">NEW COLLECTION</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => { 
                  const imagePath = `${serverApi}/${product.productImages[0]}`; 
                  
                  // Logic for size vs volume display
                  const sizeVolume = 
                    product.productCollection === ProductCollection.DRINK 
                    ? `${product.productVolume}l` 
                    : `${product.productSize} size`;

                  return ( 
                    <Card key={product._id} className="card">
                      <CardCover>
                        <img src={imagePath} alt={product.productName} />
                      </CardCover>

                      <CardCover className="card-cover" />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          zIndex: 3,
                          height: 24,
                          px: 1.125,
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(197,160,89,.25)",
                          borderRadius: "2px",
                          background: "rgba(19,27,36,.82)",
                          color: "#c5a059",
                          fontSize: "9px",
                          lineHeight: 1,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {sizeVolume}
                      </Box>

                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        className="new-card-footer"
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography className="new-card-price" textColor="neutral.300">
                          ${product.productPrice}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New Products are not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
