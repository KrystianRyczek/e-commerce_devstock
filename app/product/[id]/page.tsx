import NavigationBar from "@/components/product-details/navigation-bar";
import ProductDetails from "@/components/product-details/product-details";
import { currentProduct } from "@/util/fetching-data";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const curentParams = await params;
  const productId = Number(curentParams.id);
  const productData = await currentProduct(productId);
  return (
    <main>
      <NavigationBar productName={productData?.name} />
      {productData ? <ProductDetails product={productData} /> : null}
    </main>
  );
}
