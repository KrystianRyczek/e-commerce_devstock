import SuccessContainer from "@/components/success/success-container";

export default async function SuccessPage() {
  return (
    <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px] text-white">
      <SuccessContainer />
    </main>
  );
}
// export default async function SuccessPage(params: {
//   params: { [key: string]: string };
// }) {
//   const curentParams = await params;
//   console.log(curentParams.params.payment);

//   return (
//     <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px] text-white">
//       <SuccessContainer />
//     </main>
//   );
// }
