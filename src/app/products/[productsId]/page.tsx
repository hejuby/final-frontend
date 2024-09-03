import React from "react";
import testData from "@/data/home_test.json";

interface Params {
  productId: string;
}
const products = ({ params }: { params: Params }) => {
  const allProducts = [
    ...testData.premium,
    ...testData.popular,
    ...testData.newest,
    ...testData.imminent,
  ];

  const product = allProducts.find(
    (item) => item.id.toString() === params.productId,
  );

  if (!product) {
    return null;
  }

  return (
    <div style={{ marginTop: 200 }}>
      <h1>{product.name}</h1>
    </div>
  );
};

export default products;
