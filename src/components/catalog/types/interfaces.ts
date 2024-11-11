export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number,
        name: string;
        image: string;
    },
    images: string[];
    [key: string]: any;
}

export interface ProductCategory {
    id: number,
    name: string;
    image: string;
}

export type ViewModeGrid = 'tile' | 'list';
