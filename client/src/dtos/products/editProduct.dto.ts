export interface EditProductDto {
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryId: number;
    componentIds?: number[];
    image?: File;
}
