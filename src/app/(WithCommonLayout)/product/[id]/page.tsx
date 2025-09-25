export const dynamic = "force-dynamic";

import ProductDetail from "@/components/ProductDetails/ProductDetails";
import { getAllProduct, getSingleProduct } from "@/services/product";
import { getSpecificProductReviews } from "@/services/review";
import { TProductResponse } from "@/types/product";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const productId = (await params).id;
  const { data: product } = await getSingleProduct(productId);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl[0],
    },
  };
};

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const productId = (await params).id;

  const { data: product } = await getSingleProduct(productId);

  const { data: reviews } = await getSpecificProductReviews(productId);

  const { data: products } = await getAllProduct();

  const relatedproducts =
    products.filter(
      (med: TProductResponse) =>
        med.category === product.category && med._id !== product._id
    ) || [];

  return (
    <div className="py-16">
      <ProductDetail
        product={product}
        reviews={reviews}
        relatedProducts={relatedproducts}
      />
    </div>
  );
};

export default ProductDetailPage;
