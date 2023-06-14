import fs from "fs";

export default class ProductManager {
    constructor(path){
        this.products = [];
        this.path = path;
        this.id = 1
    }    

    addProduct = async (newProduct) => {
        try{
            const sameCode = this.products.some(product => product.code === newProduct.code)

            if(newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock !== "" && !sameCode){
                let id = this.id++;
                this.products.push({...newProduct, id});
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
                }else {
                console.log(`"${newProduct.title}" code has been used or you need to complete all values.`)
            }
        }
        catch(error){
            console.log("error");
        }
    }

    getProducts = async () => {
        try{
            const data = await fs.promises.readFile(this.path, "utf-8");
            const dataParseada = await JSON.parse(data);
            return dataParseada;
        } catch (error) {
            console.log("error")
        }
    }
    getProductById = async (id) => {
        try{
            const productsArray = await this.getProducts();
            const productToGet = productsArray.find(p => p.id === id)
            return productToGet
        }
        catch(error){
            console.log(error)
        }
    }
    updateProduct = async (product) => {
        try{
            const products = await this.getProducts()
            const productUpdate = await products.find(p => p.id === product.id)
            const indexProduct = await products.findIndex(p => p.id === product.id)

            products[indexProduct] = {...productUpdate, ...product}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products[indexProduct] 
        }
        catch(error){
            console.log("error")
        }
    }
    deteleProduct= async (id) => {
        try{
            const products = await this.getProducts();
            const indexProductToDelete = await products.findIndex(p => p.id === id);
            
            console.log(`"${products[indexProductToDelete].title}" with code "${id}" has been deleted from the array.`);
            products.splice(indexProductToDelete, 1)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        }
        catch (error) {
            console.log(error);
        }
    }
}