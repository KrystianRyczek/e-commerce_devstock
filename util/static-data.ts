export const itemPerPageArray = [6, 9, 12, 15, 18];
export const sortOptionArray = [
  { name: "Default order", filterName: "id", order: "asc"},
  { name: "Newest Arrivals", filterName: "createdAt", order: "desc" },
  { name: "Recommended", filterName: "recommended", order: ""  },
  { name: "Lowest Price", filterName: "price", order: "asc" },
  { name: "Highest Price", filterName: "price", order: "desc"},
  { name: "Name: A to Z", filterName: "name", order: "asc"},
  { name: "Name: Z to A", filterName: "name", order: "desc"},
];
