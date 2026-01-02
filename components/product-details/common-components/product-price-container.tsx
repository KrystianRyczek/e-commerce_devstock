export default function ProductPriceContainer({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) {
  return (
    <p className="text-32-44-500">
      {price} {currency}
    </p>
  );
}
