const lexer = require('./lexer');


function parser(tokens)
{
    const ast = {
        type:'Program',
        body:[]
    };

    //iterating over the tokens we created
    while(tokens.length >0){
        let token = tokens.shift();  //this removes the first element from the array with storing its value in variable token

        if(token.type === 'keyword' && token.value === 'humara'){
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
                while(tokens.length>0 && tokens[0].type!== 'keyword'){
                    expression+=tokens.shift().value;
                }
                declaration.value=expression.trim();
            }
            ast.body.push(declaration);
            continue;
        }
        console.log(tokens);
        
        //handling print token

        if(token.type ==='keyword' && token.value ==='printkaro'){
            if (tokens.length > 0) {  // Ensure there are tokens left
                ast.body.push({
                    type: 'Print',
                    expression: tokens.shift().value 
                });
            } else {
                throw new Error('Expected expression after printkaro');
            }
            continue;
        }
        console.log(tokens);
        
        //handle if-else =>agar-warna
        if(token.type ==='keyword' && token.value ==='agar'){
            let condition ='';

            if(tokens[0].type==='punctuation' && tokens[0].value==='('){
                tokens.shift();  //skip '('
                while(tokens[0].type !=='punctuation' || tokens[0].value!==')')
                {
                    condition+=tokens.shift().value;
                }
                tokens.shift();  //skip ')'
            }
            console.log(tokens);

            let body =[];
            if(tokens[0] && tokens[0].type ==='punctuation' && tokens[0].value === '{'){
                tokens.shift(); //skip '{'
                while(tokens.length > 0 && !(tokens[0].type === 'punctuation' && tokens[0].value === '}'))
                {
                    body.push(parser([tokens.shift()]).body[0]);
                }
                tokens.shift();  //skip '}'
            }
            console.log("tokens after body of if")
            console.log(tokens);

            let elsebody = [];
            if(tokens[0] && tokens[0].type === 'keyword' && tokens[0].value==='warna'){
                tokens.shift(); // Skip 'warna'
                if (tokens[0] && tokens[0].type === 'punctuation' && tokens[0].value === '{') {
                    tokens.shift(); // Skip '{'
                    while (tokens.length > 0 && !(tokens[0].type === 'punctuation' && tokens[0].value === '}')) {
                        elsebody.push(parser([tokens.shift()]).body[0]);
                    }
                    tokens.shift(); // Skip '}'
                }
            }
            console.log("tokens after body of else");
            console.log(tokens);
            
            ast.body.push({
                type: 'IfStatement',
                condition: condition.trim(),
                body,
                elsebody
            });
            continue;
        }

        //handling jabtak

        if (token.type === 'keyword' && token.value === 'jabtak') {
            let condition = '';
            if (tokens[0].type === 'punctuation' && tokens[0].value === '(') {
                tokens.shift(); // Skip '('
                while (tokens[0].type !== 'punctuation' || tokens[0].value !== ')') {
                    condition += tokens.shift().value;
                }
                tokens.shift(); // Skip ')'
            }

            let body = [];
            if (tokens[0].type === 'punctuation' && tokens[0].value === '{') {
                tokens.shift(); // Skip '{'
                while (tokens[0].type !== 'punctuation' || tokens[0].value !== '}') {
                    body.push(parser([tokens.shift()]).body[0]);
                }
                tokens.shift(); // Skip '}'
            }

            ast.body.push({
                type: 'WhileStatement',
                condition: condition.trim(),
                body
            });
        }

    }
    return ast;
}
const code = `
humara a = 5
humara b = 10
agar (a < b) {
    printkaro "a is less than b"
} warna {
    printkaro "a is not less than b"
}
`

console.log(parser(lexer(code)));

// module.exports = parser;