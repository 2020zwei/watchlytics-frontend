import { string } from "zod";

export interface AddInventoryModalTypes {
    isOpen: boolean;
    onOpenChange: any;
    options: DROPDWONOPTION[]
    defaultData?: any,
    formTitle: string,
    callBack?: () => void
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

export type USER = {
    name?: string,
    image?: string
}
export type DROPDWONOPTION = {
    value: string,
    label: string
}

export type CATEGORES = {
    id: number,
    name: string,
    description: string
}

export type RangeType = "daily" | "weekly" | "monthly" | "custom";
export type ConditionType = "new" | "used" | "refurbished";

export type FILTERTYPES = {
    brand: string;
    date: string;
    range: RangeType;
    watch: string;
    condition: ConditionType;
    buyer: string;
    seller: string;
};

type Categories = {
    count: number;
    label: string;
};

export type TotalProducts = {
    count: number;
    label: string;
    revenue: number;
};

export type TopSelling = {
    count: number;
    label: string;
    cost: number;
};

export type LowStocks = {
    ordered: number;
    not_in_stock: number;
};

export type STATETYPES = {
    categories: Categories;
    total_products: TotalProducts;
    top_selling: TopSelling;
    low_stocks: LowStocks;
};
export type DASHBOARD_STATS = {
    manage_in_stock: number;
    pending_sale: number;
    sold_amount: number;
    total_orders: number;
}
export type DASHBOARD_EXPENSE = {
    month: string;
    purchases: number;
    sales: number;
}
export type DASHBOARD_INCOME = {
    income: number;
    pending: number;
    target: number;
    color?:string
}


export interface WatchSource {
  price: number | null;
  trend: string | null;
}

export interface MARKETDATA {
  reference_number: string;
  brand: string;
  name: string;
  image_url: string;
  buying_price: number;
  sources: {
    ebay: WatchSource;
    chrono24: WatchSource;
    bezel: WatchSource;
    grailzee: WatchSource;
  };
}

export type REPOT_TYPES={
    count:number,
    results:any[]
    previous:string,
    next:string,
}






