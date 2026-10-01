import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

//**REDUX SLICE & SELECTOR
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function PopularWatches() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  console.log("popularProducts", popularProducts);

  return (
    <div className="popular-watches-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular WATCHES</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {popularProducts.length !== 0 ? (
                popularProducts.map((ele: Product) => {
               
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;
                  return (
                    <Card key={ele._id}
                     className="card">
                      <CardCover>
                        <img src={imagePath} alt={ele.productName} />
                      </CardCover>

                      <CardCover className="card-cover" />

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
                            {ele.productName}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {ele.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        className="popular-card-footer"
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          className="popular-card-description"
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {ele.productDesc || "A distinguished timepiece"}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New Products  not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
