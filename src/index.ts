//this is a decentalized remote purhase emarketplace smart contract that allows the buying and selling of products
// when the buyer buys a product, he sends the money into the smart contract and the money is held there safe unil the buyer confirms the state and availablilty of the product
//then the fund is released into the account of the seller
//buyer also has the ablility to track bought product
//this type of project solves the issue of trust of people trying to transact from a long distance
//example: Mr john in U.K trying to buy food stuffs from nigeria, what assurance does he have he wont get scammed
// what assurance does the seller has he wont get scammed if he delievrs the product first

//Note: this is not yet the final state of this project as there might be some few bug and lapses

//Walk with me as i give you a code walkthrough

import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt, Principal, serviceQuery, serviceUpdate, CallResult, Service, int8, nat } from 'azle';
import { v4 as uuidv4 } from 'uuid';
import {Address,Ledger} from 'azle/canisters/ledger';

export class Token extends Service {
    @serviceUpdate
    initializeSupply: ( name: string, originalAddress: string, ticker: string,totalSupply: nat64) => CallResult<boolean>;

    @serviceUpdate
    transfer: (from: string, to: string, amount: nat64) => CallResult<boolean>;

    @serviceQuery
    balance: (id: string) => CallResult<nat64>;

    @serviceQuery
    ticker: () => CallResult<string>;

    @serviceQuery
    name: () => CallResult<string>;

    @serviceQuery
    totalSupply: () => CallResult<nat64>;
}
//initalizing some few variables
let init: boolean;
// the address of the cannister of type Address
let cannisterAddress: Address;
// Icp cannister of type ledger
let IcpCannister: Ledger;

//create a new variable instance of the token smart contract
const tokenCanister = new Token(
    
    Principal.fromText("bw4dl-smaaa-aaaaa-qaacq-cai")
);
//initialize the token
export const initializeToken= async(network:int8, cannisterAddress: string):Promise<Result<string, string>>=>{
    if(!init){
        ic.trap("function already initialized");
    }
    cannisterAddress= cannisterAddress;
    IcpCannister = new Ledger(Principal.fromText(cannisterAddress))
    //network for testing
    if(network===0){
        //setup dummy tokens
        network=0; 
        await tokenCanister.initializeSupply('HotUpToken', cannisterAddress,"HPT",1_000_000_000_000n).call();
    }else{
        network=1
    }
    init= true;
    return Result.Ok<string, string>("the cannister has been initialized")

}


// a data type of product 
type Product = Record<{
    id: string;
    Title: string;
    Description: string;
    Owner: Principal;
    Price: nat64;
    PictureURL: string;
    Location: string;
    Buyer?: Principal;
    createdAt: nat64;
    updatedAt: Opt<nat64>; 
    status: string;
    
}>
// a data type to allow buyers track status of thier bought item
type TrackingStatus =Record<{
    comingFrom:string;
    Destination: string;
    currentlyAt: string;
    estimatedTimeToDelivery: string;
    buyer: Principal;
    seller: Principal;
    createdAt: nat64;
    updatedAt: Opt<nat64>; 

}>
// payload for type product
type ProductPayload = Record<{
    Title: string;
    Description: string;
    Price: nat64;
    PictureURL: string;
    Location: string;
}>
//payload for type TrackingStatus
type TrackingStatusPayload = Record<{
    comingFrom:string;
    Destination: string;
    currentlyAt: string;
    estimatedTimeToDelivery: string;
    
}>
// a key value pair of string to type product
const ProductSave = new StableBTreeMap<string, Product>(0,44,1024);
// a key value pair of type tracking status to type product
const TrackingStatusSave = new StableBTreeMap<TrackingStatus,Product>(0,44,1024)
// a key value pair of type principl to product
const BoughtProductSave = new StableBTreeMap<Principal, Product>(0,44,1024);

// to list all products
$query
export function ListAllProduct(): Result<Vec<Product>, string>{
    return Result.Ok(ProductSave.values());
}
// to list product by a specific unique id
$query
export function ListProductById(id: string): Result<Product, string> {
    return match(ProductSave.get(id),{
        Some:(product)=> Result.Ok<Product, string>(product),
        None:()=> Result.Err<Product, string>(`product with id=${id} not found`)
            }); 
}
// to Add a new product 
$update
export function addProduct(payload:ProductPayload): Result<Product, string>{
    // if (validatePayload(payload).length>0){
    //     return Result.Err<Product, string>(validatePayload(payload));
    // }
    try{
        const product: Product = {
            Owner: ic.caller(),
            id: uuidv4(),
            createdAt:ic.time(),
            updatedAt: Opt.None,
            status: "Not bought",
            ...payload


        }
        //inserts the collected data to productsave
        ProductSave.insert(product.id, product);
        return Result.Ok<Product, string>(product);
    }catch(error){
        return Result.Err<Product, string>("Could not succesfully add product");
    }
}
//to update an added product
$update
export function UpdateProduct(id: string, payload: ProductPayload):Result<Product , string>{
    
   
    return match(ProductSave.get(id),{
        //make sure product id is valid, else returns an error
        Some: (product)=>{
            //makes sure you are the owner of the product
            if(product.Owner.toString() !==ic.caller().toString()){
                return Result.Err<Product, string>("you are not the owner of this product");
            }
            //saves updated product
            const updatedProduct:Product = {...product, ...payload, updatedAt:Opt.Some(ic.time())}
            ProductSave.insert(product.id, updatedProduct)
            return Result.Ok<Product, string>(updatedProduct)
        },
        None:()=> Result.Err<Product, string>(`couldnt find product with the id=${id}`),
    });

};
//allows  a user to buy a product
$update
export const buyProduct = async(Id: string):Promise<Result<Product, string>>=>{
    //checks if cannister is iniiaized
    if(init===false){
        ic.trap("not initialized yet")
    }
    //make sure product id is valid, else returns an error
    return match(ProductSave.get(Id),{
        
        Some: async(product)=>{
            //Makes sure the product is not yet bought
            if(product.status !== "Not bought"){
                return Result.Err<Product, string>("Product not available for buying")
            }
            // makes sure the seller is not trying  to buy his/her own product
            if(product.Owner.toString()=== ic.caller.toString()){
                return  Result.Err<Product, string>("you are the owner of the product")
            }
            // Makes sure there's not valid buyer for the product yet
            if(product.Buyer){
               return  Result.Err<Product, string>(`product is already purchased by ${product.Buyer} `)
            }
            //buyer sends the token into the cannister
            let payingStatus = (await tokenCanister.transfer(ic.caller().toString(),cannisterAddress,product.Price).call()).Ok;
            if(!status){
                ic.trap("transction failed")
            }
            //updates info
            const updateBuyer: Product = {...product, Buyer:ic.caller(),status:"Bought",updatedAt:Opt.Some(ic.time())}
            ProductSave.insert(product.id, updateBuyer)
            return Result.Ok<Product, string>(updateBuyer)
            
        },
        None:()=> Result.Err<Product, string>(`product with id=${Id} not found`)


    })
}
//this allows the buyer to confirm bought product so the funds would be released to the seller
$update
export const buyerConfirmProduct = async(Id: string):Promise<Result<Product, string>> =>{
    //make sure product id is valid, else returns an error
    return match(ProductSave.get(Id),{

        Some: async(product)=>{
            // returns an error if there's no valid buyer for product
            if (!product.Buyer){
                return  Result.Err<Product, string>("No buyer for this product yet")
            }
            // returns an error if another user tries to call this function excuding the buyer
            if(product.Buyer?.toString() !== ic.caller.toString()){
                return Result.Err<Product, string>("you are not the buyer of this product")
            }
            // returns an error if the status of the product is not bought
            if(product.status !== "Bought" ){
                return Result.Err<Product, string>("Product is not bought")
            }
            //After passing through the checks , funds are released
            //Releases the funds into the seller's account
            let status = (await tokenCanister.transfer(cannisterAddress,product.Owner.toString(),product.Price).call()).Ok;
            if(!status){
                ic.trap("transaction failed")
            }
            // changes the owner of the Product to the buyer and sets the status to delivered
            const updatedProduct:Product = {...product, status:"delivered", Owner:ic.caller(),updatedAt:Opt.Some(ic.time())}
            ProductSave.insert(product.id, updatedProduct)
            BoughtProductSave.insert(ic.caller(), updatedProduct)
            return Result.Ok<Product, string>(updatedProduct)
        },

        None:()=> Result.Err<Product, string>(`Product with id=${Id} not found`)

    })
}
$update
export  const cancelOrder = (Id: string)=>{
    return match(ProductSave.get(Id),{
        Some:async(product)=>{
            if(product.Buyer || product.Owner !== ic.caller()){
                return Result.Err<Product, string>("you are not the product buyer")
            }
            if(product.status !=="Bought"){
                return Result.Err<Product, string>("You cannot call this function at this state")
            }
            if(!product.Buyer){
                return Result.Err<Product, string>("No buyer")
            }
            //refunds the buyer's money
            let buyer = product.Buyer;
            let status= (await tokenCanister.transfer(cannisterAddress, buyer , product.Price))
            const updatedProduct: Product= {...product, status:"Not bought",Buyer:ic.caller(),updatedAt:Opt.Some(ic.time())}
            ProductSave.insert(product.id, updatedProduct)
        },
        None:()=> Result.Err<Product, string>(`Product with id=${Id} not found`)
    })
}

$update
export const deleteProduct = (Id:string):Result<Product , string>=>{
    return match(ProductSave.get(Id),{
        Some: (product)=>  {
            if(product.status !== "Not bought"){
                return Result.Err<Product, string>("you cannot delete the product at this stage")
            }
            if (ic.caller() !== product.Owner){
                return Result.Err<Product, string>("you are not the owner of this product")
            }
            ProductSave.remove(Id);
            return Result.Ok<Product, string>(product)
        },
        

        
        None:()=> Result.Err<Product, string>(`product with id=${Id} not found`)
    })
}

//Allows buyer to track bought on shipment product

export const trackBoughtProduct= (Id: string)=>{

}

export function setTrackingStatus(Id: string,payload:TrackingStatusPayload){
    return match(ProductSave.get(Id),{
        Some:(product)=>{
            if(product.Owner !== ic.caller()){
                return Result.Err<Product, string>("you are not the product buyer")
            }
            if(product.status !=="Bought"){
                return Result.Err<Product, string>("You cannot call this function at this state")
            }
            if(!product.Buyer){
                return Result.Err<Product, string>("No buyer")
            }

            const updatedStat: TrackingStatus = {...payload, buyer: product.Buyer, seller:ic.caller(), createdAt:ic.time(),
                updatedAt: Opt.None,}
            TrackingStatusSave.insert(updatedStat,product)


          
        },
        None:()=> Result.Err<Product, string>(`Product with id=${Id} not found`)
    })
}

export const getListOfBoughtProducts = ():Result<Vec<Product>, string>=>{
    return Result.Ok(BoughtProductSave.values());
}
$query
export function searchProductByName(query:string):Result<Vec<Product>, string>{
    const productLen = ProductSave.len();
    //initializing an empty array to hold the value of product with  a particular string
    const product : Vec<Product> = [];
    //initialize the produts to a variable so we can loop over them
    const products = ProductSave.items();
    for(let i=0; i< productLen;i++){
        if(products[Number(i)][1].Title== query){
            product.push(products[Number(i)][1]);
        }
    }
    return Result.Ok(product)
    
}

function validatePayload(payload: ProductPayload){
    if(payload.Description.length===0){
        return "please input a description";
    }
    if(payload.Location.length===0){
        return "please input a Location";
    }
    if(payload.Title.length===0){
        return "please input a title";
    }
    if(payload.PictureURL.length===0){
        return "please input a picture url";
    }
}


// UUID workaround
globalThis.crypto = {
    //@ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};