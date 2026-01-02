import NavigationBar from "@/components/product-details/navigation-bar";
import ProductDetails from "@/components/product-details/product-details";
import { currentProduct } from "@/util/fetching-data";

type Props = {
  params: Promise<{ id: string }>;
};

// export default async function ProductDetailsPage({ params }: Props) {
//   const resolvedParams = await params;
//   const productId = Number(resolvedParams.id);
//   const productData = await currentProduct(productId);
export default async function ProductDetailsPage() {
  const productData = await currentProduct(10);
  return (
    <main>
      <NavigationBar productName={productData?.name} />
      {productData ? <ProductDetails product={productData} /> : null}
    </main>
  );
}
