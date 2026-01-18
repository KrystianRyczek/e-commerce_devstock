export default function ProductList({
  orderedProducts,
}: {
  orderedProducts: { productName: string }[];
}) {
  return (
    <ul className="list-disc list-inside">
      {orderedProducts.map(
        (product: { productName: string }, index: number) => (
          <li
            key={"product" + index}
            className="text-profile-text text-14-24-400 list-disc list-inside"
          >
            {product.productName}
          </li>
        )
      )}
    </ul>
  );
}
