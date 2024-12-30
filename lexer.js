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
            while(/[a-zA-Z0-9]/.test(char))
            {
                word+=char;
                char=input[++cursor];
            }

            if (['humara', 'printkaro', 'agar', 'warna', 'jabtak'].includes(word)) {
                tokens.push({ type: 'keyword', value: word });
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
        if(/[\+\-\*\/=<>]/.test(char))
        {
            tokens.push({type:'operator',value:char});
            cursor++;
            continue;
        }
        if(/[(){}]/.test(char))
        {
            tokens.push({type:'punctuation',value:char});
            cursor++;
            continue;
        }
        if (char === '"') {
            let str = '';
            char = input[++cursor]; // Skip the opening quote
            while (char !== '"' && cursor < input.length) {
                str += char;
                char = input[++cursor];
            }

            if (char === '"') {
                tokens.push({ type: 'string', value: str });
                cursor++; // Skip the closing quote
            } else {
                throw new Error('Unterminated string literal');
            }
            continue;
        }

        // Handle unexpected characters
        throw new Error(`Unexpected character: ${char}`);
    }       
    return tokens;

}

const code = `
humara a = 5
humara b = 10
agar (a < b) {
    printkaro a
} warna {
    printkaro "a is not less than b"
}
`
console.log(lexer(code));

module.exports = lexer;