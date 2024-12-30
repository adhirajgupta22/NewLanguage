const fs = require('fs');
const parser = require('./parser');
const lexer = require('./lexer');
const codeGen = require('./codeGen');
const compiler = require('./compiler');
const runner = require('./runner');


//step-1 => reading the file from the command line 

const inputfile = process.argv[2];  
//process.argv is an array that contains the command line arguments using argv[2] we can get the path to code.humara from terminal

if(!inputfile)
{
    console.error('provide the correct file name to compile and run');
    process.exit(1);
}                                  

//step-2 => read the contents of the file
const code = fs.readFileSync(inputfile,'utf-8')  //utf-8 ensures that the file is read as a string

const tokens = lexer(code);
console.log(tokens);
    
// const ast = parser(tokens);
// console.log(ast);

// const executablecode= compiler(code);
//runner(executablecode);
