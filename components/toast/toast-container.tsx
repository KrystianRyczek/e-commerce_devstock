export default function ToastContainerComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div id="toast" className="flex flex-col w-full">
      {children}
    </div>
  );
}
