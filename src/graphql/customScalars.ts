import { GraphQLScalarType,Kind,GraphQLError } from "graphql";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateRegex=/^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/;
const Emailvalidation=(value)=>{
if(typeof value!=="string"){
    throw new GraphQLError("The value is not a valid String"+value)
}
if(!emailRegex.test(value)){
    throw new GraphQLError("The value is not a valid Email Adress"+value)
}
return value;

}
const EmailASTParser=(ast)=>{
    if(ast.kind!==Kind.STRING){
        throw new GraphQLError("The value is not a valid String"+ast.kind)   
    }
    return Emailvalidation(ast.value)

}
const Datevalidation=(value)=>{
    if(typeof value!=="string"){
        console.log("there is a bug")
        throw new GraphQLError("The value is not a valid String"+value)
    }
    if(!dateRegex.test(value)){
        console.log(`regex not valid`)
        throw new GraphQLError("The value is not a valid Date"+value)
    }
    console.log(`regex valid`)
    return value;
}
const DateASTParser=(ast)=>{
    if(ast.kind!==Kind.STRING){
        console.log(`ast could not be parsed`)
        throw new GraphQLError("The value is not a valid String"+ast.kind)   
    }
    console.log(`ast parsed`)
    return Datevalidation(ast.value)
    
}
const AccountValidation= (value)=>{
if(typeof value!=="number"){
    throw new GraphQLError("The value is not a valid Account Type"+value)
}
return value
}
const AccountASTParser=(ast)=>{
if(ast.kind!==Kind.INT){
    throw new GraphQLError("Account type should be an Integer , 0 or 1")
}
return AccountValidation(ast.value)
}
const GraphQlEmailAdressConfig={
    name:"EmailAdress",
    description:"A valid Email Adress",
    serialize:Emailvalidation,
    parseValue:Emailvalidation,
    parseLiteral:EmailASTParser
}
const GraphQlDateConfig={
    name:"Date",
    description:"A valid Date",
    serialize:Datevalidation,
    parseValue:Datevalidation,
    parseLiteral:DateASTParser
}

const GraphQLAccountConfig={
    name:"Account",
    description:"A valid Account Type",
    serialize:AccountValidation,
    parseValue:AccountValidation,
    parseLiteral:AccountASTParser
}
export const EmailAdress= new GraphQLScalarType(GraphQlEmailAdressConfig)
export const Date= new GraphQLScalarType(GraphQlDateConfig)
export const Account= new GraphQLScalarType(GraphQLAccountConfig)
