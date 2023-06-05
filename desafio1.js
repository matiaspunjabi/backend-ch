class ProductManager {
    constructor(){
        this.products = []
        this.id = 1
    }
    
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id++
        }

        const repeatedCode = this.products.some(product => product.code === newProduct.code)
        if(!repeatedCode){
            this.products.push(newProduct)
            console.log(`"${newProduct.title}" with code: "${newProduct.code}" has been added.`)
        } else {
            console.log(`Code: "${newProduct.code}" has been used, please try with another code to be able to add "${newProduct.title}".`)
        }
    }
    getProducts = () => {
        console.log(this.products);
    }
    
    getProductById = (id) => {
        let filteredProduct = this.products.find(product => product.id === id);
        if(filteredProduct){
            console.log(filteredProduct);
        }else{
            console.log("Not Found");                
        }
    }
}

const manager = new ProductManager()

manager.addProduct("peanut", "lorem", 200, "img", "abc123", 3000)
manager.addProduct("chestnut", "lorem", 200, "img", "abc122", 3000)
manager.addProduct("nut", "lorem", 200, "img", "abc124", 3000);
manager.addProduct("almond", "lorem", 200, "img", "abc125", 3000);
manager.addProduct("pistachio", "lorem", 200, "img", "abc125", 3000);

manager.getProducts();
manager.getProductById(4);

