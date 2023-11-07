// type Product = {
//   name: string;
//   price: number;
// };

// type Shipping = {
//   weight: number;
//   shippingCost: number;
// };

// type ShippableProdect = Product & Shipping;


interface Product {
  name: string;
  price: number;
};

interface Shipping {
  weight: number;
  shippingCost: number;
};

interface ShippableProdect extends Product, Shipping {};