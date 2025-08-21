import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);
let query="Hello Himanshu how are you"
const token =enc.encode(query);
console.log(token);

let decodedValue=enc.decode([ 13225, 24218, 616, 6916 ]);
console.log(decodedValue);

