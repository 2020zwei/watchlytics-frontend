import { z } from "zod";
export const InventoryFormFields = [
    {
        "label": "Product Name",
        "name": "name",
        "placeholder": "Enter Product Name",
        "fieldType": "input"
    },
    {
        "label": "Product ID",
        "name": "productid",
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
        "name": "price",
        "placeholder": "Enter Buying Price",
        "fieldType": "input"
    },
    {
        "label": "Quantity",
        "name": "quantity",
        "placeholder": "Enter Quantity",
        "fieldType": "input"
    },
    {
        "label": "Shipping Price",
        "name": "shippingprice",
        "placeholder": "Enter Shipping Price",
        "fieldType": "input"
    },
    {
        "label": "Repair Cost",
        "name": "repaircost",
        "placeholder": "Enter Repair Cost",
        "fieldType": "input"
    },
    {
        "label": "Fees",
        "name": "fees",
        "placeholder": "Enter Fees",
        "fieldType": "input"
    },
    {
        "label": "Commission",
        "name": "commission",
        "placeholder": "Enter Commission",
        "fieldType": "input"
    },
    {
        "label": "Unit",
        "name": "unit",
        "placeholder": "Enter Unit",
        "fieldType": "input"
    },
    {
        "label": "Date Purchased",
        "name": "datepurchased",
        "placeholder": "Enter Date Purchased",
        "fieldType": "input"
    },
    {
        "label": "Date Sold",
        "name": "datesold",
        "placeholder": "Enter Date Sold",
        "fieldType": "input"
    },
    {
        "label": "Hold Time",
        "name": "holdtime",
        "placeholder": "Enter Hold Time",
        "fieldType": "input"
    },
    {
        "label": "Source of Sale",
        "name": "sourceofsale",
        "placeholder": "Enter Source of Sale",
        "fieldType": "input"
    },
    {
        "label": "Purchased From",
        "name": "purchasedfrom",
        "placeholder": "Enter Purchased From",
        "fieldType": "input"
    },
    {
        "label": "Listed On:",
        "name": "listedon",
        "placeholder": "Enter Listed On",
        "fieldType": "input"
    },
    {
        "label": "MSRP",
        "name": "MSRP",
        "placeholder": "Enter MSRP",
        "fieldType": "input"
    },
    {
        "label": "Sold Price",
        "name": "soldprice",
        "placeholder": "Enter Sold Price",
        "fieldType": "input"
    },
    {
        "label": "Whole Price",
        "name": "wholeprice",
        "placeholder": "Enter Whole Price",
        "fieldType": "input"
    },
    {
        "label": "Website Price",
        "name": "websiteprice",
        "placeholder": "Enter Website Price",
        "fieldType": "input"
    },
    {
        "label": "Profit Margin",
        "name": "profitmargin",
        "placeholder": "Enter Profit Margin",
        "fieldType": "input"
    },
    {
        "label": "Sold Source",
        "name": "soldsource",
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
    name: z.string().min(1, "Please enter product name"),
    productid: z.string().min(1, "Please enter product id"),
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

    client_id: z.string().min(1, "Client ID is required"),
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
        "href": "/",
        "label": "Dashboard",
        "icon": "/Home.svg"
    },
    {
        "href": "/UI/inventory",
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
