const lexer = require('./lexer');
const parser = require('./parser');
const codeGen = require('./codeGen');

function compiler(input)
{
    const tokens = lexer(input); //tokens is array of objects
    const AST = parser(tokens);  //AST will return an object basically
    const executablecode = codeGen(AST);
    // console.log(AST);
    // console.log(executablecode);
    return executablecode;
}
module.exports = compiler;