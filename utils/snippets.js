const snippets = {
    'java': {
        name: 'java',
        fileName: 'Main.java',
        language: 'java',
        files: [
            {
                name: 'Main.java',
                content: 'import java.util.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}\n'
            }
        ]
    },
    'python': {
        name: 'python',
        language: 'python',
        files: [
            {
                name: 'main.py',
                content: 'print(\'Hello world!\')\n'
            }
        ]
    },
    'c': {
        name: 'c',
        language: 'c',
        files: [
            {
                name: 'main.c',
                content: '#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}\n'
            }
        ]
    },
    'cpp': {
        name: 'cpp',
        language: 'cpp',
        files: [
            {
                name: 'main.cpp',
                content: '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!\\n";\n}\n'
            }
        ]
    },
    'nodejs': {
        name: 'NodeJS',
        language: 'nodejs',
        files: [
            {
                name: 'index.js',
                content: 'console.log("Hello, World!")\n'
            }
        ]
    },
    'javascript': {
        name: 'javascript',
        language: 'javascript',
        files: [
            {
                name: 'index.js',
                content: 'console.log("Hello, World!")\n'
            }
        ]
    },
    'groovy': {
        name: 'groovy',
        language: 'groovy',
        files: [
            {
                name: 'Main.groovy',
                content: 'println "Hello, World!"\n'
            }
        ]
    },
    'jshell': {
        name: 'jshell',
        language: 'jshell',
        files: [
            {
                name: 'script.jsh',
                content: 'System.out.println("Hello, World!");\n'
            }
        ]
    },
    'haskell': {
        name: 'haskell',
        language: 'haskell',
        files: [
            {
                name: 'Main.hs',
                content: 'main = putStrLn "Hello, World!"\n'
            }
        ]
    },
    'tcl': {
        name: 'tcl',
        language: 'tcl',
        files: [
            {
                name: 'main.tcl',
                content: 'puts "Hello, World!"\n'
            }
        ]
    },
    'lua': {
        name: 'lua',
        language: 'lua',
        files: [
            {
                name: 'Main.lua',
                content: 'print ("Hello, World!")\n'
            }
        ]
    },
    'ada': {
        name: 'ada',
        language: 'ada',
        files: [
            {
                name: 'HelloWorld.adb',
                content: 'with Ada.Text_IO; use Ada.Text_IO;\nprocedure Hello is\nbegin\n\tPut_Line ("Hello, World!");\nend Hello;\n'
            }
        ]
    },
    'commonlisp': {
        name: 'commonlisp',
        language: 'commonlisp',
        files: [
            {
                name: 'HelloWorld.lsp',
                content: '(format t "Hello, World!")\n'
            }
        ]
    },
    'd': {
        name: 'd',
        language: 'd',
        files: [
            {
                name: 'HelloWorld.d',
                content: 'import std.stdio;\n\nvoid main() {\n\twriteln("Hello, World!");\n}\n'
            }
        ]
    },
    'elixir': {
        name: 'elixir',
        language: 'elixir',
        files: [
            {
                name: 'HelloWorld.ex',
                content: 'IO.puts "Hello, World!"\n'
            }
        ]
    },
    'erlang': {
        name: 'erlang',
        language: 'erlang',
        files: [
            {
                name: 'main.erl',
                content: 'main(_) -> io:fwrite("Hello, World!").\n'
            }
        ]
    },
    'fsharp': {
        name: 'fsharp',
        language: 'fsharp',
        files: [
            {
                name: 'HelloWorld.fs',
                content: 'open System\nprintfn "Hello, World!"\n'
            }
        ]
    },
    'fortran': {
        name: 'fortran',
        language: 'fortran',
        files: [
            {
                name: 'HelloWorld.ftn',
                content: 'program hello\n\tprint *, "Hello, World!"\nend program hello\n'
            }
        ]
    },
    'assembly': {
        name: 'assembly',
        language: 'assembly',
        files: [
            {
                name: 'HelloWorld.asm',
                content: `section .data\n\thello:     db 'Hello, World!',10    ; 'Hello, World!' plus a linefeed character\n\thelloLen:  equ $-hello             ; Length of the 'Hello world!' string\n\nsection .text\n\tglobal _start\n\n_start:\n\tmov eax,4            ; The system call for write (sys_write)\n\tmov ebx,1            ; File descriptor 1 - standard output\n\tmov ecx,hello        ; Put the offset of hello in ecx\n\tmov edx,helloLen     ; helloLen is a constant, so we don't need to say\n\t                     ;  mov edx,[helloLen] to get it's actual value\n\tint 80h              ; Call the kernel\n\tmov eax,1            ; The system call for exit (sys_exit)\n\tmov ebx,0            ; Exit with return "code" of 0 (no error)\n\tint 80h;\n`
            }
        ]
    },
    'scala': {
        name: 'scala',
        language: 'scala',
        files: [
            {
                name: 'HelloWorld.scala',
                content: 'object HelloWorld {\n\tdef main(args: Array[String]): Unit = {\n\tprintln("Hello, World!")\n\t}\n}\n'
            }
        ]
    },
    'php': {
        name: 'php',
        language: 'php',
        files: [
            {
                name: 'HelloWorld.php',
                content: '<?php\n\necho "Hello world!";\n'
            }
        ]
    },
    'python2': {
        name: 'python2',
        language: 'python2',
        files: [
            {
                name: 'HelloWorld.py',
                content: 'print ("Hello, World!")\n'
            }
        ]
    },
    'csharp': {
        name: 'csharp',
        language: 'csharp',
        files: [
            {
                name: 'HelloWorld.cs',
                content: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Text.RegularExpressions;\n\nnamespace HelloWorld {\n\tpublic class Program {\n\t\tpublic static void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello, World!");\n\t\t}\n\t}\n}\n'
            }
        ]
    },
    'perl': {
        name: 'perl',
        language: 'perl',
        files: [
            {
                name: 'HelloWorld.pl',
                content: 'print "Hello, World!";\n'
            }
        ]
    },
    'ruby': {
        name: 'ruby',
        language: 'ruby',
        files: [
            {
                name: 'HelloWorld.rb',
                content: 'puts "Hello, World!"\n'
            }
        ]
    },
    'go': {
        name: 'go',
        language: 'go',
        files: [
            {
                name: 'main.go',
                content: 'package main\nimport "fmt"\n\nfunc main() {\n\tfmt.Printf("Hello, World!")\n}\n'
            }
        ]
    },
    'r': {
        name: 'r',
        language: 'r',
        files: [
            {
                name: 'HelloWorld.r',
                content: 'cat("Hello, World!")\n'
            }
        ]
    },
    'racket': {
        name: 'racket',
        language: 'racket',
        files: [
            {
                name: 'HelloWorld.rkt',
                content: '#lang racket/base\n(display "Hello, World!")\n'
            }
        ]
    },
    'ocaml': {
        name: 'ocaml',
        language: 'ocaml',
        files: [
            {
                name: 'HelloWorld.ml',
                content: 'print_string "Hello, World!"\n'
            }
        ]
    },
    'vb': {
        name: 'vb',
        language: 'vb',
        files: [
            {
                name: 'HelloWorld.vb',
                content: 'Public Module Program\n\tPublic Sub Main(args() As string)\n\t\tConsole.WriteLine("Hello, World!")\n\tEnd Sub\nEnd Module\n'
            }
        ]
    },
    'bash': {
        name: 'bash',
        language: 'bash',
        files: [
            {
                name: 'HelloWorld.sh',
                content: 'echo "Hello, World!"\n'
            }
        ]
    },
    'clojure': {
        name: 'clojure',
        language: 'clojure',
        files: [
            {
                name: 'HelloWorld.clj',
                content: '(defn greetings [msg]\r\n(println (format "Hello, %s" msg)))\r\n\r\n(greetings "World!")\n'
            }
        ]
    },
    'typescript': {
        name: 'typescript',
        language: 'typescript',
        files: [
            {
                name: 'index.ts',
                content: 'console.log("Hello, World!")\n'
            }
        ]
    },
    'cobol': {
        name: 'cobol',
        language: 'cobol',
        files: [
            {
                name: 'HelloWorld.cbl',
                content: `IDENTIFICATION DIVISION.\r\nPROGRAM-ID. HELLO-WORLD.\r\nPROCEDURE DIVISION.\r\nDISPLAY 'Hello, World!'.\r\nSTOP RUN.\n`
            }
        ]
    },
    'kotlin': {
        name: 'kotlin',
        language: 'kotlin',
        files: [
            {
                name: 'Main.kt',
                content: 'fun main(args: Array<String>) {\r\n  println("Hello, World!")\r\n}\n'
            }
        ]
    },
    'pascal': {
        name: 'pascal',
        language: 'pascal',
        files: [
            {
                name: 'HelloWorld.pas',
                content: `program Hello;\r\nbegin\r\n  writeln ('Hello, World!')\r\nend.\n`
            }
        ]
    },
    'prolog': {
        name: 'prolog',
        language: 'prolog',
        files: [
            {
                name: 'HelloWorld.pl',
                content: `:- initialization(main).\r\nmain :- write('Hello, World!').\n`
            }
        ]
    },
    'rust': {
        name: 'rust',
        language: 'rust',
        files: [
            {
                name: 'main.rs',
                content: 'fn main() {\r\n    println!("Hello, World!");\r\n}\n'
            }
        ]
    },
    'swift': {
        name: 'swift',
        language: 'swift',
        files: [
            {
                name: 'HelloWorld.swift',
                content: 'print("Hello, World!")\n'
            }
        ]
    },
    'octave': {
        name: 'octave',
        language: 'octave',
        files: [
            {
                name: 'HelloWorld.m',
                content: `disp('Hello, World!')\n`
            }
        ]
    },
    'text': {
        name: 'text',
        language: 'text',
        files: [
            {
                name: 'notes.txt',
                content: 'Hello, World!\n'
            }
        ]
    },
    'brainfk': {
        name: 'brainfk',
        language: 'brainfk',
        files: [
            {
                name: 'helloworld.bf',
                content: '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.\n'
            }
        ]
    },
    'coffeescript': {
        name: 'coffeescript',
        language: 'coffeescript',
        files: [
            {
                name: 'helloworld.coffee',
                content: 'console.log \"Hello, World!\"\n'
            }
        ]
    },
    'ejs': {
        name: 'ejs',
        language: 'ejs',
        files: [
            {
                name: 'helloworld.ejs',
                content: `<%\n let message = 'Hello, World!'\n%>\n<%= message %>\n`
            }
        ]
    },
}

export default snippets