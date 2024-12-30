const parser = require('./parser');
const lexer = require('./lexer');

function codeGen(node)  //codegen converts the AST into understandable executable code it can be 
                        //in any language/Binary
{
    //this code gen can also be changed in a way that the executable code can also become a c++
    //code such as by replacing const to int and console to printf.
    switch(node.type){
        case 'Program' : return node.body.map(codeGen).join('\n');
        case 'Declaration' : return `const ${node.name} = ${node.value};`;
        case 'Print' : return `console.log(${node.expression});`;
        case 'IfStatement':
            const elseBlock = node.elseBody.length > 0 ? `else { ${node.elseBody.map(codeGen).join('\n')} }` : '';
            return `if (${node.condition}) { ${node.body.map(codeGen).join('\n')} } ${elseBlock}`;
        case 'WhileStatement':
            return `while (${node.condition}) { ${node.body.map(codeGen).join('\n')} }`;
    }
}

const code = `
humara a = 5
humara b = 10
agar (a < b) {
    printkaro a
} warna {
    printkaro b
}
`;

console.log(codeGen(parser(lexer(code))));
module.exports =codeGen;