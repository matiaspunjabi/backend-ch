import ProductManager from "./ProductManager/productManager.js";

const manager = new ProductManager("./files/products.json");

const product1 = {
    title: "nuts",
    description: "lorem",
    price: 200,
    thumbnail: "img",
    code: "abc001",
    stock: 1000
};
const product2 = {
    title: "peanuts",
    description: "lorem",
    price: 200,
    thumbnail: "img",
    code: "abc002",
    stock: 1000
};
const product3 = {
    title: "almonds",
    description: "lorem",
    price: 200,
    thumbnail: "img",
    code: "abc002",
    stock: 1000
};
const product4 = {
    title: "chestnuts",
    description: "lorem",
    price: 200,
    thumbnail: "img",
    code: "abc003",
    stock: 1000
};

await manager.addProduct(product1);
await manager.addProduct(product2);
await manager.addProduct(product4);
// product with same code 
await manager.addProduct(product3);

console.log("getProducts metod:")
console.log(await manager.getProducts());

console.log("getProductsById metod:")
console.log(await manager.getProductById(1));

// updating product´s price with id 1
console.log("updating product´s price with id 1") 
console.log(await manager.updateProduct({id: 1, price: 400}));

// delete product with id 2
await manager.deteleProduct(2);

