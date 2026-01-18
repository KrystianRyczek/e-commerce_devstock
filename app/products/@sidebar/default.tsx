import SideBar from "@/components/side-bar/side-bar";
import { brandsNameList, categoriesNameList } from "@/util/fetching-data";
import { currencys } from "@/util/static-data";
export default async function SideBarPage() {
  const categories = await categoriesNameList();
  const brands = await brandsNameList();
  return (
    <SideBar
      currencys={currencys}
      categories={categories}
      brands={brands}
    ></SideBar>
  );
}
