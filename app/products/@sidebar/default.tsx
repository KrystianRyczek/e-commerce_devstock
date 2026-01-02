import SideBar from "@/components/side-bar/side-bar";
import { brandsNameList, categoriesNameList } from "@/util/fetching-data";

const currencys = [
  { name: "PLN", rate: 1 },
  { name: "USD", rate: 4.0 },
  { name: "EUR", rate: 4.5 },
];

export default async function SideBarPage() {
  const categories = await categoriesNameList;
  const brands = await brandsNameList;
  return (
    <SideBar
      currencys={currencys}
      categories={categories}
      brands={brands}
    ></SideBar>
  );
}
