import SideBar from "@/components/side-bar/side-bar";

const currencys = [
  { name: "PLN", rate: 1 },
  { name: "USD", rate: 4.0 },
  { name: "EUR", rate: 4.5 },
];
const categories = ["Clothes", "Electronics", "Furniture", "Toys"];

export default async function SideBarPage() {
  return <SideBar currencys={currencys} categories={categories}></SideBar>;
}
