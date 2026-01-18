import OrderContainer from "./order-container";

export default function TransactionContainer({
  orders,
}: {
  orders: {
    id: number;
    paymentStatus: string | null;
    createdAt: Date;
    orderedProducts: { productName: string }[];
  }[];
}) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-profile-text-secondary border-b border-profile-text-secondary mb-4 pb-2 max-w-[470px] text-18-28-600">
        Transactions
      </h2>
      <ul>
        {orders.map((order) => (
          <OrderContainer
            key={order.id + "container"}
            orderId={order.id}
            paymentStatus={order.paymentStatus}
            createdAt={order.createdAt}
            orderedProducts={order.orderedProducts}
          />
        ))}
      </ul>
    </div>
  );
}
