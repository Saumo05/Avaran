export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter you user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter you email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter you password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter you email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter you password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "kanjivaram", label: "Kanjivaram" },
      { id: "handloom", label: "Handloom" },
      { id: "siffon", label: "Siffon" },
      { id: "katan_silk", label: "Katan Silk" },
      { id: "kantha_stitch", label: "Kantha Stitch" },
    ],
  },
  {
    label: "Colour",
    name: "colour",
    componentType: "select",
    options: [
      { id: "blue", label: "Blue" },
      { id: "red", label: "Red" },
      { id: "yellow", label: "Yellow" },
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "green", label: "Green" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sales price(optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const categoryOptionsMap = {
  kanjivaram: "Kanjivaram",
  handloom: "Handloom",
  siffon: "Siffon",
  katan_silk: "Katan Silk",
  kantha_stitch: "Kantha Stitch",
};

export const colourOptionsMap = {
  blue: "Blue",
  red: "Red",
  yellow: "Yellow",
  black: "Black",
  white: "White",
  green: "Green",
};

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "sarees",
    label: "Sarees",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
  {
    id: "blouse",
    label: "Blouse",
    path: "/shop/listing",
  },
  {
    id: "junk_jewelleries",
    label: "Junk Jewelleries",
    path: "/shop/listing",
  },
];

export const filterOptions = {
  category: [
    { id: "kanjivaram", label: "Kanjivaram" },
    { id: "handloom", label: "Handloom" },
    { id: "siffon", label: "Siffon" },
    { id: "katan_silk", label: "Katan Silk" },
    { id: "kantha_stitch", label: "Kantha Stitch" },
  ],
  colour: [
    { id: "blue", label: "Blue" },
    { id: "red", label: "Red" },
    { id: "yellow", label: "Yellow" },
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "green", label: "Green" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },

  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your State",
  },
  {
    label: "Country",
    name: "country",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Country",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
