
import { z } from "zod";

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
const city = {
    "label": "City:",
    "name": "city",
    "placeholder": "Enter City",
    "fieldType": "input",
    "type": "text"
}

const quantity = {
    "label": "Quantity",
    "name": "quantity",
    "placeholder": "Enter Quantity",
    "fieldType": "input",
    "type": "number"
}

export const InventoryFormFields = [
    {
        "label": "Model Name",
        "name": "model_name",
        "placeholder": "Enter Model Name",
        "fieldType": "input"
    },
    {
        "label": "Reference Number",
        "name": "product_id",
        "placeholder": "Enter reference number",
        "fieldType": "input"
    },
    {
        "label": "Brand",
        "name": "category",
        "placeholder": "Select product brand",
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
        ...quantity
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
        "label": "Year",
        "name": "year",
        "placeholder": "Enter Year",
        "fieldType": "input",
        "type": "number"
    },
    {
        "label": "Website Price",
        "name": "website_price",
        "placeholder": "Enter Website Price",
        "fieldType": "input",
        "type": "number"
    },
    // {
    //     "label": "Profit Margin",
    //     "name": "profit_margin",
    //     "placeholder": "Enter Profit Margin",
    //     "fieldType": "input",
    //     "type": "number"
    // },
    // {
    //     "label": "Profit",
    //     "name": "profit",
    //     "placeholder": "Enter profit",
    //     "fieldType": "input",
    //     "type": "number"
    // },
    {
        "label": "Unit",
        "name": "unit",
        "placeholder": "Enter Unit",
        "fieldType": "input"
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
    model_name: z
        .string()
        .nonempty("Model name is required")
        .min(3, "Model name must be at least 3 characters")
        .max(200, "Max 200 characters"),
    year: z.preprocess(
        (val) => typeof val === "string" ? Number(val) : val,
        z
            .number()
            .min(1, "Year is required and must be greater than 0")
    ),

    product_id: z
        .string()
        .nonempty("Reference number is required")
        .min(3, "Reference ID must be at least 3 characters")
        .max(50, "Max 50 characters"),

    category: z.union([z.string(), z.number()])
        .refine(val => val !== null && val !== undefined && val !== '', {
            message: "Brand is required",
        }),

    availability: z.preprocess(
        (val) => (val === "" ? undefined : val),
        availabilityEnum.optional().default("in_stock")
    ),

    buying_price: z
        .coerce.number()
        .min(0.01, "Buying price is required"),

    quantity: z.coerce.number()
        .int({ message: "Quantity must be an integer." })
        .min(1, { message: "Quantity must be at least 1." })
        .default(1),

    date_purchased: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                const date = new Date(val);
                return isNaN(date.getTime()) ? undefined : date;
            }
            return val;
        },
        z.date({
            required_error: "Purchase date is required",
            invalid_type_error: "Invalid date format",
        })
    ),

    shipping_price: z.coerce.number().nullable().optional(),
    repair_cost: z.coerce.number().nullable().optional(),



    fees: z
        .coerce.number().optional(),

    commission: z
        .coerce.number().optional(),

    msrp: z
        .coerce.number().optional(),

    website_price: z
        .coerce.number().optional(),

    sold_price: z.coerce.number().nullable().optional(),
    whole_price: z.coerce.number().nullable().optional(),
    // profit_margin: z.coerce.number().nullable().optional(),
    // profit: z.coerce.number().nullable().optional(),
    unit: z.string().nullable().optional(),
    date_sold: z.preprocess(
        (val) => {
            if (val === '' || val === null) return undefined;

            if (typeof val === 'string') {
                const date = new Date(val);
                return isNaN(date.getTime()) ? undefined : date;
            }
            return val;
        },
        z.date().optional()
    ),

    source_of_sale: z.string().nullable().optional(),
    delivery_content: z.string().nullable().optional(),
    condition: z.preprocess(
        (val) => (val === "" ? undefined : val),
        conditionEnum.optional().default("new")
    ),
    purchased_from: z.string().nullable().optional(),
    sold_source: z.string().nullable().optional(),
    listed_on: z.string().nullable().optional(),

    image: z.any().refine(
        (val) =>
            (val instanceof File && val.size > 0) ||
            (typeof val === "string" && val.length > 0),
        { message: "Image is required" }
    ),

    serial_number: z.string().nullable().optional(),
}).refine((data) => {
    if (!data.date_sold) return true;
    return new Date(data.date_purchased) <= new Date(data.date_sold);
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
    {
        "href": "/customers",
        "label": "Customers",
        "icon": "user"
    },
    {
        "href": "/shipping",
        "label": "Shipping",
        "icon": "shipping"
    },
    {
        "href": "/transaction",
        "label": "Transaction",
        "icon": "trade",
        "matchPaths": ["/trading", "/add-trading", "/edit-trading"]
    },
    {
        "href": "/invoices",
        "label": "Invoices",
        "icon": "trade"
    },
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
    "Profit & Loss Report",
    "Stock Aging",
    "Expense Report",
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


export const RecipientInformationFields = [
    {
        "label": "Search:",
        "name": "search",
        "placeholder": "Search...",
        "fieldType": "input",
        "type": "text",
        "isSearch": true
    },
    {
        "label": "Contact name:",
        "name": "contact_name",
        "placeholder": "Enter contact name",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Address:",
        "name": "address",
        "placeholder": "Enter Address",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Suite, Apt or FL#:",
        "name": "suite_apt_or_fL",
        "placeholder": "Enter Suite, Apt or FL",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Zip:",
        "name": "zip",
        "placeholder": "Enter Zip",
        "fieldType": "input",
        "type": "text"
    },
    {
        ...city
    },
    {
        "label": "State:",
        "name": "state",
        "placeholder": "Select State",
        "fieldType": "select"
    },
    {
        "label": "Country:",
        "name": "country",
        "placeholder": "Select Country",
        "fieldType": "select"
    },
    {
        "label": "Phone:",
        "name": "phone",
        "placeholder": "Enter Phone",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "",
        "name": "",
        "placeholder": "Enter",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Email:",
        "name": "email",
        "placeholder": "Enter Email",
        "fieldType": "input",
        "type": "email"
    },
]
export const PackageFields = [
    {
        "label": "Packaging type:",
        "name": "packaging_type",
        "placeholder": "Select Packaging Pype",
        "fieldType": "select"
    },
    {
        "label": "Type of Service:",
        "name": "type_of_service",
        "placeholder": "Select Type of Service",
        "fieldType": "select"
    },
    {
        "label": "Payment Type:",
        "name": "payment_type",
        "placeholder": "Select Payment Type",
        "fieldType": "select"
    },
    {
        "label": "Pickup Date:",
        "name": "pickup_date",
        "placeholder": "Enter Pickup Date",
        "fieldType": "input",
        "type": "date"
    },
    {
        "label": "Issued Value:",
        "name": "issued_value:",
        "placeholder": "Issued Value",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Package Weight:",
        "name": "package_weight",
        "placeholder": "Enter Package Weight",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Signature Options:",
        "name": "signature_options",
        "placeholder": "Select Signature Options",
        "fieldType": "select"
    },
    {
        "label": "Hold for Pickup?",
        "name": "hold_for_pickup",
        "placeholder": "HAL",
        "fieldType": "input",
        "type": "checkbox"
    },
    {
        "label": "Residential?",
        "name": "residential",
        "placeholder": "HAL",
        "fieldType": "input",
        "type": "checkbox"
    },
    {
        "label": "Estimated Cost:",
        "name": "estimated_cost",
        "placeholder": "Enter Estimated Cost",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Reference:",
        "name": "reference",
        "placeholder": "Enter Reference",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Label Format Type:",
        "name": "label_format_type",
        "placeholder": "Enter Label Format Type",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Generate Label on Save?",
        "name": "generate_label_on_save",
        "placeholder": "",
        "fieldType": "input",
        "type": "checkbox"
    },
    {
        "label": "Display Receipt?",
        "name": "display_receipt",
        "placeholder": "",
        "fieldType": "input",
        "type": "checkbox"
    },
    {
        "label": "Schedule a pickup?",
        "name": "schedule_pickup",
        "placeholder": "",
        "fieldType": "input",
        "type": "checkbox"
    },
]
export const SenderFields = [
    {
        "label": "Search:",
        "name": "sender_search",
        "placeholder": "Search...",
        "fieldType": "input",
        "type": "text",
        "isSearch": true
    },
    {
        "label": "Select Address:",
        "name": "sender_address",
        "placeholder": "Select Address",
        "fieldType": "select"
    },
    {
        "label": "Company Name:",
        "name": "sender_company_name",
        "placeholder": "Enter Company Name",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Name of Label:",
        "name": "sender_name_of_label",
        "placeholder": "Enter Name of Label",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Your Name:",
        "name": "sender_name",
        "placeholder": "Enter Your Name",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Address:",
        "name": "sender_secondary_address",
        "placeholder": "Enter Address",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Suite, Apt or FL#:",
        "name": "sender_suite_apt_or_fL",
        "placeholder": "Enter Suite, Apt or FL",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Zip:",
        "name": "sender_zip",
        "placeholder": "Enter Zip",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "City:",
        "name": "sender_city",
        "placeholder": "Enter City",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "State:",
        "name": "sender_state",
        "placeholder": "Select State",
        "fieldType": "select"
    },
    {
        "label": "Country:",
        "name": "sender_country",
        "placeholder": "Select Country",
        "fieldType": "select"
    },
    {
        "label": "Phone:",
        "name": "sender_phone",
        "placeholder": "Enter Phone",
        "fieldType": "input",
        "type": "text"
    },
    {
        "label": "Email:",
        "name": "sender_Email",
        "placeholder": "Enter Email",
        "fieldType": "input",
        "type": "email"
    },


]


export const InvoiceFormFields = [

    {
        "label": "Name:",
        "name": "name",
        "placeholder": "Select Product name",
        "fieldType": "select",
        "type": "text"
    },
    { ...email },
    {
        "label": "Date:",
        "name": "date",
        "placeholder": "Select Date",
        "fieldType": "input",
        "type": "date"
    },
    { ...quantity },
    {
        "label": "Unit Price:",
        "name": "unit_price",
        "placeholder": "Enter Unit Price",
        "fieldType": "input",
        "type": "number"
    },
    { ...city }

]


export const InvoiceFormFieldsSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    date: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                const date = new Date(val);
                return isNaN(date.getTime()) ? undefined : date;
            }
            return val;
        },
        z.date({
            required_error: "Date is required",
            invalid_type_error: "Invalid date format",
        })
    ),
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, "Quantity is required"),
    unit_price: z
        .number({ invalid_type_error: "Unit Price must be a number" })
        .min(0.01, "Unit Price is required"),
    city: z.string().min(1, "City is required"),
});


