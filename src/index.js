"use strict";
//this is a decentalized remote purhase emarketplace smart contract that allows the buying and selling of products
// when the buyer buys a product, he sends the money into the smart contract and the money is held there safe unil the buyer confirms the state and availablilty of the product
//then the fund is released into the account of the seller
//buyer also has the ablility to track bought product
//this type of project solves the issue of trust of people trying to transact from a long distance
//example: Mr john in U.K trying to buy food stuffs from nigeria, what assurance does he have he wont get scammed
// what assurance does the seller has he wont get scammed if he delievrs the product first
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductByName = exports.getListOfBoughtProducts = exports.setTrackingStatus = exports.trackBoughtProduct = exports.deleteProduct = exports.cancelOrder = exports.buyerConfirmProduct = exports.buyProduct = exports.UpdateProduct = exports.addProduct = exports.ListProductById = exports.ListAllProduct = exports.initializeToken = exports.Token = void 0;
//Note: this is not yet the final state of this project as there might be some few bug and lapses
//Walk with me as i give you a code walkthrough
var azle_1 = require("azle");
var uuid_1 = require("uuid");
var ledger_1 = require("azle/canisters/ledger");
var Token = exports.Token = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _initializeSupply_decorators;
    var _initializeSupply_initializers = [];
    var _transfer_decorators;
    var _transfer_initializers = [];
    var _balance_decorators;
    var _balance_initializers = [];
    var _ticker_decorators;
    var _ticker_initializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _totalSupply_decorators;
    var _totalSupply_initializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(Token, _super);
            function Token() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.initializeSupply = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _initializeSupply_initializers, void 0));
                _this.transfer = __runInitializers(_this, _transfer_initializers, void 0);
                _this.balance = __runInitializers(_this, _balance_initializers, void 0);
                _this.ticker = __runInitializers(_this, _ticker_initializers, void 0);
                _this.name = __runInitializers(_this, _name_initializers, void 0);
                _this.totalSupply = __runInitializers(_this, _totalSupply_initializers, void 0);
                return _this;
            }
            return Token;
        }(azle_1.Service)),
        (function () {
            _initializeSupply_decorators = [azle_1.serviceUpdate];
            _transfer_decorators = [azle_1.serviceUpdate];
            _balance_decorators = [azle_1.serviceQuery];
            _ticker_decorators = [azle_1.serviceQuery];
            _name_decorators = [azle_1.serviceQuery];
            _totalSupply_decorators = [azle_1.serviceQuery];
            __esDecorate(null, null, _initializeSupply_decorators, { kind: "field", name: "initializeSupply", static: false, private: false, access: { has: function (obj) { return "initializeSupply" in obj; }, get: function (obj) { return obj.initializeSupply; }, set: function (obj, value) { obj.initializeSupply = value; } } }, _initializeSupply_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _transfer_decorators, { kind: "field", name: "transfer", static: false, private: false, access: { has: function (obj) { return "transfer" in obj; }, get: function (obj) { return obj.transfer; }, set: function (obj, value) { obj.transfer = value; } } }, _transfer_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _balance_decorators, { kind: "field", name: "balance", static: false, private: false, access: { has: function (obj) { return "balance" in obj; }, get: function (obj) { return obj.balance; }, set: function (obj, value) { obj.balance = value; } } }, _balance_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _ticker_decorators, { kind: "field", name: "ticker", static: false, private: false, access: { has: function (obj) { return "ticker" in obj; }, get: function (obj) { return obj.ticker; }, set: function (obj, value) { obj.ticker = value; } } }, _ticker_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } } }, _name_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _totalSupply_decorators, { kind: "field", name: "totalSupply", static: false, private: false, access: { has: function (obj) { return "totalSupply" in obj; }, get: function (obj) { return obj.totalSupply; }, set: function (obj, value) { obj.totalSupply = value; } } }, _totalSupply_initializers, _instanceExtraInitializers);
        })(),
        _a;
}();
//initalizing some few variables
var init;
// the address of the cannister of type Address
var cannisterAddress;
// Icp cannister of type ledger
var IcpCannister;
//create a new variable instance of the token smart contract
var tokenCanister = new Token(azle_1.Principal.fromText("bw4dl-smaaa-aaaaa-qaacq-cai"));
//initialize the token
var initializeToken = function (network, cannisterAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init) {
                    azle_1.ic.trap("function already initialized");
                }
                cannisterAddress = cannisterAddress;
                IcpCannister = new ledger_1.Ledger(azle_1.Principal.fromText(cannisterAddress));
                if (!(network === 0)) return [3 /*break*/, 2];
                //setup dummy tokens
                network = 0;
                return [4 /*yield*/, tokenCanister.initializeSupply('HotUpToken', cannisterAddress, "HPT", 1000000000000n).call()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                network = 1;
                _a.label = 3;
            case 3:
                init = true;
                return [2 /*return*/, azle_1.Result.Ok("the cannister has been initialized")];
        }
    });
}); };
exports.initializeToken = initializeToken;
// a key value pair of string to type product
var ProductSave = new azle_1.StableBTreeMap(0, 44, 1024);
// a key value pair of type tracking status to type product
var TrackingStatusSave = new azle_1.StableBTreeMap(0, 44, 1024);
// a key value pair of type principl to product
var BoughtProductSave = new azle_1.StableBTreeMap(0, 44, 1024);
// to list all products
azle_1.$query;
function ListAllProduct() {
    return azle_1.Result.Ok(ProductSave.values());
}
exports.ListAllProduct = ListAllProduct;
// to list product by a specific unique id
azle_1.$query;
function ListProductById(id) {
    return (0, azle_1.match)(ProductSave.get(id), {
        Some: function (product) { return azle_1.Result.Ok(product); },
        None: function () { return azle_1.Result.Err("product with id=".concat(id, " not found")); }
    });
}
exports.ListProductById = ListProductById;
// to Add a new product 
azle_1.$update;
function addProduct(payload) {
    // if (validatePayload(payload).length>0){
    //     return Result.Err<Product, string>(validatePayload(payload));
    // }
    try {
        var product = __assign({ Owner: azle_1.ic.caller(), id: (0, uuid_1.v4)(), createdAt: azle_1.ic.time(), updatedAt: azle_1.Opt.None, status: "Not bought" }, payload);
        //inserts the collected data to productsave
        ProductSave.insert(product.id, product);
        return azle_1.Result.Ok(product);
    }
    catch (error) {
        return azle_1.Result.Err("Could not succesfully add product");
    }
}
exports.addProduct = addProduct;
//to update an added product
azle_1.$update;
function UpdateProduct(id, payload) {
    return (0, azle_1.match)(ProductSave.get(id), {
        //make sure product id is valid, else returns an error
        Some: function (product) {
            //makes sure you are the owner of the product
            if (product.Owner.toString() !== azle_1.ic.caller().toString()) {
                return azle_1.Result.Err("you are not the owner of this product");
            }
            //saves updated product
            var updatedProduct = __assign(__assign(__assign({}, product), payload), { updatedAt: azle_1.Opt.Some(azle_1.ic.time()) });
            ProductSave.insert(product.id, updatedProduct);
            return azle_1.Result.Ok(updatedProduct);
        },
        None: function () { return azle_1.Result.Err("couldnt find product with the id=".concat(id)); },
    });
}
exports.UpdateProduct = UpdateProduct;
;
//allows  a user to buy a product
azle_1.$update;
var buyProduct = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //checks if cannister is iniiaized
        if (init === false) {
            azle_1.ic.trap("not initialized yet");
        }
        //make sure product id is valid, else returns an error
        return [2 /*return*/, (0, azle_1.match)(ProductSave.get(Id), {
                Some: function (product) { return __awaiter(void 0, void 0, void 0, function () {
                    var payingStatus, updateBuyer;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //Makes sure the product is not yet bought
                                if (product.status !== "Not bought") {
                                    return [2 /*return*/, azle_1.Result.Err("Product not available for buying")];
                                }
                                // makes sure the seller is not trying  to buy his/her own product
                                if (product.Owner.toString() === azle_1.ic.caller.toString()) {
                                    return [2 /*return*/, azle_1.Result.Err("you are the owner of the product")];
                                }
                                // Makes sure there's not valid buyer for the product yet
                                if (product.Buyer) {
                                    return [2 /*return*/, azle_1.Result.Err("product is already purchased by ".concat(product.Buyer, " "))];
                                }
                                return [4 /*yield*/, tokenCanister.transfer(azle_1.ic.caller().toString(), cannisterAddress, product.Price).call()];
                            case 1:
                                payingStatus = (_a.sent()).Ok;
                                if (!status) {
                                    azle_1.ic.trap("transction failed");
                                }
                                updateBuyer = __assign(__assign({}, product), { Buyer: azle_1.ic.caller(), status: "Bought", updatedAt: azle_1.Opt.Some(azle_1.ic.time()) });
                                ProductSave.insert(product.id, updateBuyer);
                                return [2 /*return*/, azle_1.Result.Ok(updateBuyer)];
                        }
                    });
                }); },
                None: function () { return azle_1.Result.Err("product with id=".concat(Id, " not found")); }
            })];
    });
}); };
exports.buyProduct = buyProduct;
//this allows the buyer to confirm bought product so the funds would be released to the seller
azle_1.$update;
var buyerConfirmProduct = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //make sure product id is valid, else returns an error
        return [2 /*return*/, (0, azle_1.match)(ProductSave.get(Id), {
                Some: function (product) { return __awaiter(void 0, void 0, void 0, function () {
                    var status, updatedProduct;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                // returns an error if there's no valid buyer for product
                                if (!product.Buyer) {
                                    return [2 /*return*/, azle_1.Result.Err("No buyer for this product yet")];
                                }
                                // returns an error if another user tries to call this function excuding the buyer
                                if (((_a = product.Buyer) === null || _a === void 0 ? void 0 : _a.toString()) !== azle_1.ic.caller.toString()) {
                                    return [2 /*return*/, azle_1.Result.Err("you are not the buyer of this product")];
                                }
                                // returns an error if the status of the product is not bought
                                if (product.status !== "Bought") {
                                    return [2 /*return*/, azle_1.Result.Err("Product is not bought")];
                                }
                                return [4 /*yield*/, tokenCanister.transfer(cannisterAddress, product.Owner.toString(), product.Price).call()];
                            case 1:
                                status = (_b.sent()).Ok;
                                if (!status) {
                                    azle_1.ic.trap("transaction failed");
                                }
                                updatedProduct = __assign(__assign({}, product), { status: "delivered", Owner: azle_1.ic.caller(), updatedAt: azle_1.Opt.Some(azle_1.ic.time()) });
                                ProductSave.insert(product.id, updatedProduct);
                                BoughtProductSave.insert(azle_1.ic.caller(), updatedProduct);
                                return [2 /*return*/, azle_1.Result.Ok(updatedProduct)];
                        }
                    });
                }); },
                None: function () { return azle_1.Result.Err("Product with id=".concat(Id, " not found")); }
            })];
    });
}); };
exports.buyerConfirmProduct = buyerConfirmProduct;
azle_1.$update;
var cancelOrder = function (Id) {
    return (0, azle_1.match)(ProductSave.get(Id), {
        Some: function (product) { return __awaiter(void 0, void 0, void 0, function () {
            var buyer, status, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (product.Buyer || product.Owner !== azle_1.ic.caller()) {
                            return [2 /*return*/, azle_1.Result.Err("you are not the product buyer")];
                        }
                        if (product.status !== "Bought") {
                            return [2 /*return*/, azle_1.Result.Err("You cannot call this function at this state")];
                        }
                        if (!product.Buyer) {
                            return [2 /*return*/, azle_1.Result.Err("No buyer")];
                        }
                        buyer = product.Buyer;
                        return [4 /*yield*/, tokenCanister.transfer(cannisterAddress, buyer, product.Price)];
                    case 1:
                        status = (_a.sent());
                        updatedProduct = __assign(__assign({}, product), { status: "Not bought", Buyer: azle_1.ic.caller(), updatedAt: azle_1.Opt.Some(azle_1.ic.time()) });
                        ProductSave.insert(product.id, updatedProduct);
                        return [2 /*return*/];
                }
            });
        }); },
        None: function () { return azle_1.Result.Err("Product with id=".concat(Id, " not found")); }
    });
};
exports.cancelOrder = cancelOrder;
azle_1.$update;
var deleteProduct = function (Id) {
    return (0, azle_1.match)(ProductSave.get(Id), {
        Some: function (product) {
            if (product.status !== "Not bought") {
                return azle_1.Result.Err("you cannot delete the product at this stage");
            }
            if (azle_1.ic.caller() !== product.Owner) {
                return azle_1.Result.Err("you are not the owner of this product");
            }
            ProductSave.remove(Id);
            return azle_1.Result.Ok(product);
        },
        None: function () { return azle_1.Result.Err("product with id=".concat(Id, " not found")); }
    });
};
exports.deleteProduct = deleteProduct;
//Allows buyer to track bought on shipment product
var trackBoughtProduct = function (Id) {
};
exports.trackBoughtProduct = trackBoughtProduct;
function setTrackingStatus(Id, payload) {
    return (0, azle_1.match)(ProductSave.get(Id), {
        Some: function (product) {
            if (product.Owner !== azle_1.ic.caller()) {
                return azle_1.Result.Err("you are not the product buyer");
            }
            if (product.status !== "Bought") {
                return azle_1.Result.Err("You cannot call this function at this state");
            }
            if (!product.Buyer) {
                return azle_1.Result.Err("No buyer");
            }
            var updatedStat = __assign(__assign({}, payload), { buyer: product.Buyer, seller: azle_1.ic.caller(), createdAt: azle_1.ic.time(), updatedAt: azle_1.Opt.None });
            TrackingStatusSave.insert(updatedStat, product);
        },
        None: function () { return azle_1.Result.Err("Product with id=".concat(Id, " not found")); }
    });
}
exports.setTrackingStatus = setTrackingStatus;
var getListOfBoughtProducts = function () {
    return azle_1.Result.Ok(BoughtProductSave.values());
};
exports.getListOfBoughtProducts = getListOfBoughtProducts;
azle_1.$query;
function searchProductByName(query) {
    var productLen = ProductSave.len();
    //initializing an empty array to hold the value of product with  a particular string
    var product = [];
    //initialize the produts to a variable so we can loop over them
    var products = ProductSave.items();
    for (var i = 0; i < productLen; i++) {
        if (products[Number(i)][1].Title == query) {
            product.push(products[Number(i)][1]);
        }
    }
    return azle_1.Result.Ok(product);
}
exports.searchProductByName = searchProductByName;
function validatePayload(payload) {
    if (payload.Description.length === 0) {
        return "please input a description";
    }
    if (payload.Location.length === 0) {
        return "please input a Location";
    }
    if (payload.Title.length === 0) {
        return "please input a title";
    }
    if (payload.PictureURL.length === 0) {
        return "please input a picture url";
    }
}
