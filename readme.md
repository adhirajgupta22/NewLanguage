### Example Code:
```humara
humara a = 5
humara b = 10
agar (a < b) {
    printkaro "a is less than b"
} warna {
    printkaro "a is not less than b"
}

humara sum = 0
jabtak (sum <= 20) {
    sum = sum + a
    printkaro sum
}

### Tokens
[
    { "type": "keyword", "value": "humara" },
    { "type": "identifier", "value": "a" },
    { "type": "operator", "value": "=" },
    { "type": "number", "value": "5" },
    { "type": "keyword", "value": "humara" },
    { "type": "identifier", "value": "b" },
    { "type": "operator", "value": "=" },
    { "type": "number", "value": "10" },
    { "type": "keyword", "value": "agar" },
    { "type": "symbol", "value": "(" },
    { "type": "identifier", "value": "a" },
    { "type": "operator", "value": "<" },
    { "type": "identifier", "value": "b" },
    { "type": "symbol", "value": ")" },
    { "type": "symbol", "value": "{" },
    { "type": "keyword", "value": "printkaro" },
    { "type": "string", "value": "\"a is less than b\"" },
    { "type": "symbol", "value": "}" },
    { "type": "keyword", "value": "warna" },
    { "type": "symbol", "value": "{" },
    { "type": "keyword", "value": "printkaro" },
    { "type": "string", "value": "\"a is not less than b\"" },
    { "type": "symbol", "value": "}" },
    { "type": "keyword", "value": "humara" },
    { "type": "identifier", "value": "sum" },
    { "type": "operator", "value": "=" },
    { "type": "number", "value": "0" },
    { "type": "keyword", "value": "jabtak" },
    { "type": "symbol", "value": "(" },
    { "type": "identifier", "value": "sum" },
    { "type": "operator", "value": "<=" },
    { "type": "number", "value": "20" },
    { "type": "symbol", "value": ")" },
    { "type": "symbol", "value": "{" },
    { "type": "identifier", "value": "sum" },
    { "type": "operator", "value": "=" },
    { "type": "identifier", "value": "sum" },
    { "type": "operator", "value": "+" },
    { "type": "identifier", "value": "a" },
    { "type": "keyword", "value": "printkaro" },
    { "type": "identifier", "value": "sum" },
    { "type": "symbol", "value": "}" }
]


### Abstract syntax tree
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                { "id": "a", "value": 5 }
            ]
        },
        ...
    ]
}


