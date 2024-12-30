function lexer(input)
{
    const tokens =[];
    cursor =0;

    while(cursor<input.length)
    {
        let char = input[cursor];

        //skip whitespaces
        if(/\s/.test(char))
        {
            cursor++;
            continue;
        }
        //incase of an alphabet

        if(/[a-zA-Z]/.test(char))
        {
            let word ='';
            while(/[a-zA-z0-9]/.test(char))
            {
                word+=char;
                char=input[++cursor];
            }

            if(word==='humara'|| word ==='printkaro'){
                tokens.push({type:'keyword',value:word});
            }
            else{
                tokens.push({type:'identifier',value:word});  //variable vala part
            }
            continue;
        }
        //incase of a number

        if(/[0-9]/.test(char))
        {
            let num = '';
            while(/[0-9]/.test(char))
            {
                num+=char;
                char=input[++cursor];
            }
            tokens.push({type:'number',value:parseInt(num)});
            continue;
        }

        //tokenize operators and equal sign
        if(/[\+\-\*\/=]/.test(char))
        {
            tokens.push({type:'operator',value:char});
            cursor++;
            continue;
        }
    }
    return tokens;

}

function parser(tokens)
{
    const ast = {
        type:'Program',
        body:[]
    };

    //iterating over the tokens we created
    while(tokens.length >0){
        let token = tokens.shift();  //this removes the first element from the array with storing its value in variable token

        if(token.type === 'keyword' && token.value == 'humara'){
            //this is basically declaration of a variable
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };
            if(tokens[0].type ==='operator' && tokens[0].value === '='){
                tokens.shift(); //mpving ahead of the assignment ie to the number

                //parse the expression 
                let expression = '';
                while(tokens.length>0 && tokens[0].type!= 'keyword'){
                    expression+=tokens.shift().value;
                }
                declaration.value=expression.trim();

            }
            ast.body.push(declaration);
        }

        if(token.type ==='keyword' && token.value ==='printkaro'){
            ast.body.push({
                type:'Print',
                expression:tokens.shift().value 
            });

        }

    }
    return ast;
}
function codeGen(node)  //codegen converts the AST into understandable executable code it can be 
                        //in any language/Binary
{
    //this code gen can also be changed in a way that the executable code can also become a c++
    //code such as by replacing const to int and console to printf.
    switch(node.type){
        case 'Program' : return node.body.map(codeGen).join('\n');
        case 'Declaration' : return `const ${node.name} = ${node.value};`
        case 'Print' : return `console.log(${node.expression});`
    }
}

function compiler(input)        
{
    const tokens = lexer(input); //tokens is array of objects
    const AST = parser(tokens);  //AST will return an object basically
    const executablecode = codeGen(AST);
    // console.log(AST);
    // console.log(executablecode);
    return executablecode;
}
function runner(input)
{
    eval(input);
}

const code = `
humara x=10
humara y=20

humara sum = x+y
printkaro sum
`
const exec = compiler(code);
const ans = runner(exec);
console.log(ans);