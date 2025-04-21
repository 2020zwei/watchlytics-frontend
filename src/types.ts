export interface AddInventoryModalTypes {
    isOpen: boolean;
    onOpenChange: any;
}
export interface FileMetaTypes {
    url: string;
    file: any;
}
export interface PaginationTypes {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
}

export type METHODTYPES = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface RequestTypes {
    url: string;
    payload?: any;
    method?: METHODTYPES;
    headers?: Record<string, string>;
}
export type PlanFeature = {
    [key: string]: string;
};

export type Plans = {
    id: number;
    name: string;
    price: string;
    description: string;
    features: PlanFeature[];
    stripe_price_id: string;
    is_popular: boolean;
};


