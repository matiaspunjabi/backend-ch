import fs from 'fs';

class ProductManager {

    constructor(path) {
        this.path = path;
    };

    addProduct = async(product) => {

        try {

            const products = await this.getProducts();
            
            //validacion de que existen todos los campos! 
            if(!product.title || !product.description || !product.price || !product.code || product.stock == undefined){
                return null;
            };

            //verificacion de que el campo code no exista en otro producto
            const codeRepetido = products.find(p => p.code == product.code);
            if(codeRepetido) {
                return null;
            };

            if(!product.thumbnail) product.thumbnail = []

            if(!product.status) product.status = true

            //metodo para agregar automaticamente un id autoincremental!
            let id;
            if(products.length == 0) {
                id = 1
            } else {
                id = products[products.length -1].id + 1
            }

            //pusheo mi producto al array y actualizo el archivo .json
            products.push({
                ...product,
                id
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product

        } catch (err) {
            console.log(err);
        };                   

    };

    getProducts = async() => {
        try {
            //si existe mi archivo obtengo sus datos y los retorno, y sino retorno un array vacio. 
            if(fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                const parseData = JSON.parse(data);

                return parseData;

            } else {
                return [];
            };
        } catch (err) {
            console.log(err);
        };
    };

    getProductsById = async(id) => {
        try {
            let resultado = await this.getProducts();
            let product = resultado.find( p => p.id == id );

            //si encuentro un producto con el id ingresado retorno el producto sino un null
            if(product) {
                return product;
            } else {
                return null;
            };
        } catch (err) {
            console.log(err);
        };
    };

    updateProduct = async(product) => {
        try {

            const products = await this.getProducts();
            const productToUpdate = products.find( p => p.id == product.id );
            
            //si no encontro este producto en nuestro .json retorno que no se encontro este producto
            if(!productToUpdate) {
                return null;
            };
            
            //busco el indice del producto para actualizar, actualizo ese producto, ya sea 1 campo o todos y actualizo el .json
            const indexOfProduct = products.findIndex( p => p.id == product.id );

            products[indexOfProduct] = {
                ...productToUpdate,
                ...product
            };

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products[indexOfProduct];

        } catch (err) {
            console.log(err);
        };

    };

    deleteProduct = async(id) => {
        try {

            const products = await this.getProducts();
            const indexProduct = products.findIndex( p => p.id === id );
            //validacion para ver si encontro el producto, de no ser asi retorna que no encontro el producto con ese id.
            if(indexProduct === -1) {
                return null;
            };
            
            const deletedProduct = products[indexProduct]
            //elimino del array el producto que se desea borrar, actualizo el .json y retorno el array sin ese producto 
            products.splice(indexProduct, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return deletedProduct;

        } catch(err) {
            console.log(err);
        };
    };

};

const arrayProducts = [
    {
        title: "nuts",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc001",
        stock: 1000
    },
    {
        title: "peanuts",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc002",
        stock: 1000
    },
    {
        title: "almonds",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc003",
        stock: 1000
    },
    {
        title: "chestnuts",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc004",
        stock: 1000
    },
    {
        title: "pistachio",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc005",
        stock: 1000
    },
    {
        title: "banana chip",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc006",
        stock: 1000
    },
    {
        title: "dehydrated kiwi",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc007",
        stock: 1000
    },
    {
        title: "apple chips",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc008",
        stock: 1000
    },
    {
        title: "peach",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc009",
        stock: 1000
    },
    {
        title: "dehydrated plum",
        description: "lorem",
        price: 200,
        thumbnail: "img",
        code: "abc010",
        stock: 1000
    },
    
]


export const initializeProducts = async(manager) => {

    for (let item of arrayProducts) {
        await manager.addProduct(item)
    }

};

export default ProductManager;

