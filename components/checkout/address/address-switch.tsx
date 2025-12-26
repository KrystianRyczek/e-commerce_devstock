export default function AddressSwitch({
  newAddressSelected,
  setNewAddressSelected,
  remove,
  insert,
}: {
  newAddressSelected: boolean;
  setNewAddressSelected: (value: boolean) => void;
  remove: (index: number) => void;
  insert: (index: number, value: any) => void;
}) {
  return (
    <div className="flex w-full mb-[16px]">
      <button
        className={`flex w-1/2 h-[40px] text-18-28-600 items-center justify-center border-b-[1px] ${
          newAddressSelected
            ? " border-amber-50 text-amber-50"
            : " border-amber-600 text-amber-600"
        }`}
        type="button"
        onClick={() => {
          setNewAddressSelected(false);
          remove(0);
          insert(0, {
            street: "",
            country: "",
            province: "",
            city: "",
            zip: "",
          });
        }}
      >
        Use Existing Address
      </button>
      <button
        className={`flex w-1/2 h-[40px] text-18-28-600 items-center justify-center border-b-[1px] ${
          newAddressSelected
            ? " border-amber-600 text-amber-600"
            : " border-amber-50 text-amber-50"
        }`}
        type="button"
        onClick={() => {
          setNewAddressSelected(true);
          remove(0);
          insert(0, {
            street: "",
            country: "",
            province: "",
            city: "",
            zip: "",
            main: false,
          });
        }}
      >
        Enter New Address
      </button>
    </div>
  );
}
