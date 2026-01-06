export default function QuantityInput({
  defautlValue,
  stock,
  quantityRef,
  subtractHandler,
  addHandler,
}: {
  defautlValue: number;
  stock: number;
  quantityRef?: React.RefObject<HTMLInputElement | null>;
  subtractHandler: () => void;
  addHandler: () => void;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor="quantity"
        className="flex w-[142px] h-[54px] rounded-[6px] border-[1px] border-purchasing-container-stock-border text-purchasing-container-stock-text "
      >
        <button
          className="w-1/4 text-[30px] pl-2"
          type="button"
          onClick={subtractHandler}
        >
          -
        </button>
        <input      
          className="w-1/2 flex justify-center text-center outline-none text-[24px] font-[500]"
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={stock}
          ref={quantityRef}
          defaultValue={defautlValue > stock ? stock : defautlValue}
          disabled
        />
        <button
          className="w-1/4 text-[30px] pr-2"
          type="button"
          onClick={addHandler}
        >
          +
        </button>
      </label>
      <p>Stock: {stock}</p>
    </div>
  );
}
