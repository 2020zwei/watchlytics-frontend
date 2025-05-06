
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
        "label": "Availability",
        "name": "availability",
        "placeholder": "Select product availability",
        "fieldType": "select"
    },
    {
        "label": "Condition",
        "name": "condition",
        "placeholder": "Select product condition",
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
        "label": "Profit",
        "name": "profit",
        "placeholder": "Enter profit",
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
        "label": "Sold Source",
        "name": "sold_source",
        "placeholder": "Enter Sold Source",
        "fieldType": "input"
    },
    {
        "label": "Listed On:",
        "name": "listed_on",
        "placeholder": "Enter Listed On",
        "fieldType": "input"
    },
    {
        "label": "Serial Number:",
        "name": "serial_number",
        "placeholder": "Enter serial number",
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


const availabilityEnum = z.enum(["in_stock", "sold", "reserved", "in_repair"]);
const conditionEnum = z.enum(["new", "used"]);

export const InventoryFormSchema = z.object({
    product_name: z.string().min(3, "Product name is required").max(200, "Max 200 characters"),
    product_id: z.string().max(50, "Max 50 characters"),
    category: z.union([z.string(), z.number()]),
    availability: availabilityEnum.default("in_stock"),
    buying_price: z.coerce.number(),
    quantity: z.coerce.number().int().default(1),
    date_purchased: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date({ required_error: "Purchase date is required" })
    ),

    shipping_price: z.coerce.number().nullable().optional(),
    repair_cost: z.coerce.number().nullable().optional(),
    hold_time: z.coerce.number().int().min(1, "Hold time is required"),
    fees: z.coerce.number().min(1, "Fees is required"),
    commission: z.coerce.number().min(1, "Commission is required"),
    msrp: z.coerce.number().min(1, "MSRP is required"),
    website_price: z.coerce.number().min(1, "Whole price is required"),
    sold_price: z.coerce.number().nullable().optional(),
    whole_price: z.coerce.number().nullable().optional(),
    profit_margin: z.coerce.number().nullable().optional(),
    profit: z.coerce.number().nullable().optional(),
    unit: z.string().nullable().optional(),
    date_sold: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date({ required_error: "Sale date is required" })
    ),

    source_of_sale: z.string().nullable().optional(),
    delivery_content: z.string().nullable().optional(),
    condition: conditionEnum.default("new").nullable().optional(),
    purchased_from: z.string().nullable().optional(),
    sold_source: z.string().nullable().optional(),
    listed_on: z.string().nullable().optional(),
    image: z
        .union([
            z.instanceof(File),
            z.string().url().min(1),
        ])
        .refine((val) => {
            if (val instanceof File) return val.size > 0;
            return typeof val === "string" && val.length > 0;
        }, { message: "Image is required" }),
    serial_number: z.string().nullable().optional(),
}).refine((data) => {
    if (!data.date_sold) return true;
    return new Date(data.date_purchased) < new Date(data.date_sold);
}, {
    message: "Date Purchased must be less than Date Sold",
    path: ["date_sold"],
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
        "icon": "home"
    },
    {
        "href": "/inventory",
        "label": "Inventory",
        "icon": "inventory"
    },
    {
        "href": "/reports",
        "label": "Reports",
        "icon": "report"
    },
    // {
    //     "href": "/customers",
    //     "label": "Customers",
    //     "icon": "user"
    // },
    {
        "href": "/shipping",
        "label": "Shipping",
        "icon": "shipping"
    },
    {
        "href": "/trade",
        "label": "Trade",
        "icon": "trade",
        "matchPaths": ["/trading", "/add-trading", "/edit-trading"]
    },
    // {
    //     "href": "/invoices",
    //     "label": "Invoices",
    //     "icon": "/hugeicons_invoice-04.svg"
    // },
    {
        "href": "/profile",
        "label": "Settings",
        "icon": "setting"
    },
    {
        "href": "#",
        "label": "Log Out",
        "icon": "logout"
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
export const availabilities = [
    { "value": "in_stock", "label": "In stock" },
    { "value": "sold", "label": "Sold" },
    { "value": "reserved", "label": "Reserved" },
    { "value": "in_repair", "label": "Rn repair" },
];
export const conditions = [
    { "value": "new", "label": "New" },
    { "value": "used", "label": "Used" }
];


