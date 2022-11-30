export interface EditProductFormValuesDto {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  categoryId: number;
  componentIds?: number[];
}
