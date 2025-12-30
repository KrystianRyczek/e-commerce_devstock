export type RecommendedProduct = {
  category: string;
  imgUrls: string;
  id: number;
  name: string;
  price: number;
  prevPrice: number;
};
export type Category = {
  id: number;
  name: string;
  imgUrl: { url: string } | null;
};

export type SectionCard = {
  label: string;
  image: string | undefined;
};
