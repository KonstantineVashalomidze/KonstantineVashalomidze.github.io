let data = {
    "articles": [
        {
            "id": "defining-high-level-programming-language",
            "titleHTML": " Defining\n                                        <dfn title=\"A high-level programming language is a programming language with strong abstraction from the details of the computer.\">\n                                            high-level programming language\n                                        </dfn>",
            "descriptionHTML": "In this article I will define what a high-level programming language is and will create a simple one, for which we will later write a lexer, parser and interpreter.",
            "previewHTML": "<pre>\n                                    <code>\n// Function definition\nvar add = fn(a, b) { return a + b; };\n\n// Function call\nadd(1, 2);\n\n// Recursive function\nvar factorial = fn(n) {\n    if (n == 0) { 1; }\n    else { n * factorial(n - 1); }\n};\n\n// Higher-order function\nvar higherOrderFunction = fn(f, x) {\n    return f(f(x));\n};\n\nvar invert = fn(b) { !b; };\n\n// Evaluates to true\nhigherOrderFunction(invert, true);\n                                    </code>\n                                </pre>",
            "previewCaptionHTML": "<em>High-level language preview</em>",
            "readMoreHTML": "                                        <a href=\"./articles/defining-high-level-programming-language.html\"\n                                           title=\"Defining high-level programming language\">\n                                            Read more\n                                        </a>",
            "status": "on"
        },
        {
            "id": "creating-lexer-and-parser",
            "titleHTML": "Creating\n                                        <dfn title=\"A lexer is a component of a compiler or interpreter that breaks down source code into tokens\">\n                                            lexer\n                                        </dfn>\n                                        and\n                                        <dfn title=\"A parser is a component of a compiler or interpreter that breaks down tokens into abstract syntax trees\">\n                                            parser\n                                        </dfn>\n                                        of the\n                                        <dfn title=\"A high-level programming language is a programming language with strong abstraction from the details of the computer.\">\n                                            high-level programming language\n                                        </dfn>",
            "descriptionHTML": "In this article I will create a <dfn\n                                    title=\"A lexer is a component of a compiler or interpreter that breaks down source code into tokens\">lexer</dfn>\n                                and <dfn\n                                    title=\"A parser is a component of a compiler or interpreter that breaks down tokens into abstract syntax trees\">parser</dfn>\n                                for the <dfn\n                                    title=\"A high-level programming language is a programming language with strong abstraction from the details of the computer.\">high-level\n                                programming language</dfn> defined in the previous article.",
            "previewHTML": "<pre>\n                                    <code>\nLexer lexer = new Lexer(\"var x = 10;\");\nParser parser = new Parser(lexer);\n\n// And if needed, parse the program\n// Root of AST\nProgram program = parser.parseProgram();\n                                    </code>\n                                </pre>",
            "previewCaptionHTML": "<em>Lexer and parser construction preview</em>",
            "readMoreHTML": "<a href=\"./articles/creating-lexer-and-parser-of-the-high-level-programming-language.html\"\n                                           title=\"Creating lexer and parser of the high-level programming language\">\n                                            Read more\n                                        </a>",
            "status": "off"

        },
        {
            "id": "creating-interpreter-from-scratch",
            "titleHTML": "Creating\n                                        <dfn title=\"An interpreter is a program that converts source code into machine code at runtime\">\n                                            interpreter\n                                        </dfn>\n                                        from scratch",
            "descriptionHTML": "In this article I will create an <dfn\n                                    title=\"An interpreter is a program that converts source code into machine code at runtime\">interpreter</dfn>\n                                for the <dfn\n                                    title=\"A high-level programming language is a programming language with strong abstraction from the details of the computer.\">high-level\n                                programming language</dfn>, bringing together the <dfn\n                                    title=\"A lexer is a component of a compiler or interpreter that breaks down source code into tokens\">lexer</dfn>\n                                and <dfn\n                                    title=\"A parser is a component of a compiler or interpreter that breaks down tokens into abstract syntax trees\">parser</dfn>\n                                from previous articles.",
            "previewHTML": "<pre><code>\nHello konst! This is Kosta's programming language\nFeel free to type in commands\n\n>> var x = 5; var y = 10; x + y;\n15\n\n>> var factorial = fn(n) {\n    if (n == 0) { 1; }\n    else { n * factorial(n - 1); }\n};\n...\n\n>> fn(x) { return factorial(x); } (3);\n6\n\n>> var logicalExpression = !true & false\n    | true != 5 > 7 - 1;\ntrue\n\n>> var complexComparison = (5 > 7 == 5 < 7)\n    != false;\nfalse\n\n>> var add = fn(a, b) { return a + b; };\n    add(1, 2);\n3\n\n>> |\n</code></pre>",
            "previewCaptionHTML": "<em>Interpreter examples preview</em>",
            "readMoreHTML": "<a href=\"./articles/creating-interpreter-from-scratch.html\"\n                                           title=\"Creating interpreter from scratch\">\n                                            Read more\n                                        </a>",
            "status": "on"

        }
    ]
};


const articleList = document.querySelector("#articleList");
const createButton = document.createElement("button");
createButton.innerHTML = "Create article";


function displayArticles() {
    data.articles.forEach(a => {
        const dt = document.createElement("dt");
        const titleSpan = document.createElement("span");
        const hr1 = document.createElement("hr");

        titleSpan.innerHTML = a.titleHTML;
        dt.appendChild(titleSpan);
        dt.appendChild(hr1);

        articleList.appendChild(dt);

        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        const moveUpButton = document.createElement("button");
        const moveDownButton = document.createElement("button");
        const toggleOnOffButton = document.createElement("button");

        dt.appendChild(deleteButton);
        dt.appendChild(editButton);
        dt.appendChild(moveUpButton);
        dt.appendChild(moveDownButton);
        dt.appendChild(toggleOnOffButton);

        deleteButton.innerHTML = "Delete";
        editButton.innerHTML = "Edit";
        moveUpButton.innerHTML = "Move up";
        moveDownButton.innerHTML = "Move down";
        toggleOnOffButton.innerHTML = `Turn ${a.status}`;

        deleteButton.addEventListener("click", () => {
            data = data.articles.filter(el => {
                return el.id !== a.id;
            });

            displayArticles();
        });

        editButton.addEventListener("click", () => {

        });

        moveUpButton.addEventListener("click", () => {
            for (let i = 0; i < data.articles.length; i++) {
                if (i > 0 && data.articles[i].id === a.id) {
                    const temp = data.articles[i];
                    data.articles[i] = data.articles[i - 1];
                    data.articles[i - 1] = temp;
                }
            }
            displayArticles();
        });

        moveDownButton.addEventListener("click", () => {
            for (let i = 0; i < data.articles.length; i++) {
                if (i + 1< data.articles.length) {
                    const temp = data.articles[i];
                    data.articles[i] = data.articles[i + 1];
                    data.articles[i + 1] = temp;
                }
            }
            displayArticles();
        });

        toggleOnOffButton.addEventListener("click", () => {
            if (a.status === "on") {
                a.status = "off";
            } else {
                a.status = "on";
            }
            displayArticles();
        });

    });
}


displayArticles();

articleList.appendChild(createButton);




