
import { z } from "zod";
export const InventoryFormFields = [
    {
        "label": "Product Name",
        "name": "product_name",
        "placeholder": "Enter Product Name",
        "fieldType": "input"
    },
    {
        "label": "Product ID",
        "name": "product_id",
        "placeholder": "Enter product category",
        "fieldType": "input"
    },
    {
        "label": "Category",
        "name": "category",
        "placeholder": "Select product category",
        "fieldType": "select"
    },
    {
        "label": "Buying Price",
        "name": "buying_price",
        "placeholder": "Enter Buying Price",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Quantity",
        "name": "quantity",
        "placeholder": "Enter Quantity",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Shipping Price",
        "name": "shipping_price",
        "placeholder": "Enter Shipping Price",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Repair Cost",
        "name": "repair_cost",
        "placeholder": "Enter Repair Cost",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Fees",
        "name": "fees",
        "placeholder": "Enter Fees",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Commission",
        "name": "commission",
        "placeholder": "Enter Commission",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Unit",
        "name": "unit",
        "placeholder": "Enter Unit",
        "fieldType": "input"
    },
    {
        "label": "Date Purchased",
        "name": "date_purchased",
        "placeholder": "Enter Date Purchased",
        "fieldType": "input",
        "type": "date"
    },
    {
        "label": "Date Sold",
        "name": "date_sold",
        "placeholder": "Enter Date Sold",
        "fieldType": "input",
        "type": "date"
    },
    {
        "label": "Hold Time",
        "name": "hold_time",
        "placeholder": "Enter Hold Time",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Source of Sale",
        "name": "source_of_sale",
        "placeholder": "Enter Source of Sale",
        "fieldType": "input"
    },
    {
        "label": "Purchased From",
        "name": "purchased_from",
        "placeholder": "Enter Purchased From",
        "fieldType": "input"
    },
    {
        "label": "Listed On:",
        "name": "listed_on",
        "placeholder": "Enter Listed On",
        "fieldType": "input"
    },
    {
        "label": "MSRP",
        "name": "msrp",
        "placeholder": "Enter MSRP",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Sold Price",
        "name": "sold_price",
        "placeholder": "Enter Sold Price",
        "fieldType": "input"
    },
    {
        "label": "Whole Price",
        "name": "whole_price",
        "placeholder": "Enter Whole Price",
        "fieldType": "input"
    },
    {
        "label": "Website Price",
        "name": "website_price",
        "placeholder": "Enter Website Price",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Profit Margin",
        "name": "profit_margin",
        "placeholder": "Enter Profit Margin",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Sold Source",
        "name": "sold_source",
        "placeholder": "Enter Sold Source",
        "fieldType": "input"
    },
]
const email = {
    label: "Email",
    name: "email",
    placeholder: "Enter Email",
    fieldType: "input",
    type: "email"
}
const password = {
    label: "Password",
    name: "password",
    placeholder: "Enter Password",
    fieldType: "input",
    type: "password"
}
export const ProfileFormFields = [
    {
        label: "Name",
        name: "first_name",
        placeholder: "Enter Name",
        fieldType: "input",
    },
    {
        label: "Email",
        name: "email",
        placeholder: "Enter Email",
        fieldType: "input",
        type: "email"
    },
    {
        label: "Phone",
        name: "phone_number",
        placeholder: "Enter Phone",
        fieldType: "input"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "Enter Password",
        fieldType: "input",
        type: "password"
    },
    {
        label: "Confirm Password",
        name: "confirm_password",
        placeholder: "Confirm Password",
        fieldType: "input",
        type: "password"
    },
    {
        label: "Client ID",
        name: "client_id",
        placeholder: "Enter Client ID",
        fieldType: "input"
    }
];
export const LoginFormFields = [
    email,
    password
]

export const InventoryFormSchema = z.object({
    product_name: z.string().min(1, "Product name is required"),
    product_id: z.string().min(1, "Product ID is required"),
    category: z.string({ required_error: "Category is required" }),
    buying_price: z.string().min(1, "Buying price is required"),
    shipping_price: z.string().min(1, "Shipping price is required"),
    repair_cost: z.string().min(1, "Repair cost is required"),
    fees: z.string().min(1, "Fees are required"),
    commission: z.string().min(1, "Commission is required"),
    msrp: z.string().min(1, "MSRP is required"),
    whole_price: z.string().min(1, "Wholesale price is required"),
    website_price: z.string().min(1, "Website price is required"),
    sold_price: z.string().min(1, "Sold price is required"),
    profit_margin: z.string().min(1, "Profit margin is required"),
    quantity: z.string().min(1, "Quantity is required"),
    unit: z.string().min(1, "Unit is required"),
    date_purchased: z.string().min(1, "Date purchased is required"),
    hold_time: z.string().min(1, "Hold time is required"),
    purchased_from: z.string().min(1, "Purchased from is required"),
    listed_on: z.string().min(1, "Listed on is required"),
    sold_source: z.string().min(1, "Sold source is required"),
    source_of_sale: z.string().min(1, "Source of sale is required"),
    date_sold: z.string().min(1, "Sold date on is required"),
    image: z.any().optional().nullable(),
});


export const ProfileFormSchema = z.object({
    first_name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    profile_picture: z.any().optional(),
    date_joined: z.any().optional(),
    phone_number: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number can't be more than 15 digits")
        .or(z.literal("")).optional(),

    password: z.string()
        .optional()
        .refine(val => !val || val.length >= 6, {
            message: "Password must be at least 6 characters",
        }),

    confirm_password: z.string()
        .optional()
        .refine(val => !val || val.length >= 6, {
            message: "Confirm Password must be at least 6 characters",
        }),

    client_id: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{1,10}$/.test(val), {
            message: "Client ID must be up to 10 digits",
        }),

})
    .refine((data) => {
        if (!data.password && !data.confirm_password) return true;
        return data.password === data.confirm_password;
    }, {
        path: ["confirm_password"],
        message: "Passwords do not match",
    });

export const SidebarItems = [
    {
        "href": "/dashboard",
        "label": "Dashboard",
        "icon": "/Home.svg"
    },
    {
        "href": "/inventory",
        "label": "Inventory",
        "icon": "/Inventory.svg"
    },
    {
        "href": "/reports",
        "label": "Reports",
        "icon": "/Report.svg"
    },
    {
        "href": "/customers",
        "label": "Customers",
        "icon": "/customer-class-line-svgrepo-com 1.svg"
    },
    {
        "href": "/shipping",
        "label": "Shipping",
        "icon": "/hugeicons_shipment-tracking.svg"
    },
    {
        "href": "/invoices",
        "label": "Invoices",
        "icon": "/hugeicons_invoice-04.svg"
    },
    {
        "href": "#",
        "label": "Log Out",
        "icon": "/Log Out.svg"
    },
]
export const Filters: string[] = ["brand", "date", "range", "watch conditon", "buyer", "seller"]
export const REPORTFILTEROPTIONS = [
    "Inventory Valuation Report",
    "Purchase & Sales Report",
    "Stock Aging",
    "Expense Report",
    "Market Comparison Report",
    "Monthly Profit & Loss Chart",
    "User-Specific Reports",
    "Stock Turnover Analysis",
    "Live Inventory Dashboard"
]

