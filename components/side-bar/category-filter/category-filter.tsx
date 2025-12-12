import CategoryInput from "./category-input";
import FilterContainer from "../common-components/filter-container";

export default function CategoryFilter({
  categories,
  categoriesNotSelected,
}: {
  categories: string[];
  categoriesNotSelected: boolean;
}) {
  return (
    <FilterContainer label="Category">
      <ul>
        <li className="py-1">
          <CategoryInput label="All" checked={categoriesNotSelected} />
        </li>
        {categories.map((category) => (
          <li key={category} className="py-1">
            <CategoryInput label={category} dataId="category" />
          </li>
        ))}
      </ul>
    </FilterContainer>
  );
}
