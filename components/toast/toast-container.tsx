export default function ToastContainerComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div id="toast" className="flex w-full">
      {children}
    </div>
  );
}
