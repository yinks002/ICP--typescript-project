//this is a simple-erc20 smart contract
//it is for the issuance for dummy tokens for the project HotUP which is a decentralized emarket platform that runs on the blockchain
//NOTE: this was not done by me and it is available on the internet

import { nat64, $query, $update, ic } from 'azle';

type Account = {
    address: string;
    balance: nat64;
};

type State = {
    accounts: {
        [key: string]: Account;
    };
    name: string;
    ticker: string;
    totalSupply: nat64;
};

let state: State = {
    accounts: {},
    name: "",
    ticker: "",
    totalSupply: 0n,
};

// Update functions

$update;
export function initializeSupply(
    name: string,
    originalAddress: string,
    ticker: string,
    totalSupply: nat64
): boolean {
    // Check for valid input here (e.g., valid name, ticker, and totalSupply)

    state = {
        ...state,
        accounts: {
            [originalAddress]: {
                address: originalAddress,
                balance: totalSupply,
            },
        },
        name,
        ticker,
        totalSupply,
    };

    return true;
}

$update;
export function transfer(
    fromAddress: string,
    toAddress: string,
    amount: nat64
): boolean {
    if (state.accounts[toAddress] === undefined) {
        state.accounts[toAddress] = {
            address: toAddress,
            balance: 0n
        };
    }

    if (state.accounts[fromAddress] === undefined) {
        state.accounts[fromAddress] = {
            address: fromAddress,
            balance: 0n
        };
    }
    const fromBalance = state.accounts[fromAddress].balance;

    if (fromBalance < amount) {
        ic.trap("Insufficient amount")
    }

    state.accounts[fromAddress].balance -= amount;
    state.accounts[toAddress].balance += amount;

    return true;
}

// Query functions

$query;
export function balance(address: string): nat64 {
    return state.accounts[address]?.balance ?? 0n;
}

$query;
export function getTicker(): string {
    return state.ticker;
}

$query;
export function getName(): string {
    return state.name;
}

$query;
export function getTotalSupply(): nat64 {
    return state.totalSupply;
}