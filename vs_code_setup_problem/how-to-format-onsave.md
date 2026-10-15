# Format On Save

Format your code everytime you click save or CTRL + S.

## Background

I got annoyed everytime I saw a lot of my friends code looks horrible. I mean who write indent 4 on html, css? Today's web browser always serve with indent 2. Then I saw someone wrote python using indent 2. Probably his vs code indent settings stuck at 2 just like I did back then. So coming from the same mistakes just like everyone else, I try to fix all of this and this is what I came up so far. Hope this will be very helpful for you.

## Prettier Format On Save Properly

1. Install prettier in extension tab
2. Go to `settings.json` using `CTRL + Shift + p` then search `Open User Settings (JSON)`
3. Add this line:

```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

## Setup Code Format for Every Languages

This one is different, you need to install some more extension and yes this cost so much space but I don't care right. If you want to know which extension you had to install, here's the list:

| Languages                                                 | Extension ID                          |
| --------------------------------------------------------- | ------------------------------------- |
| **Solidity**                                              | `NomicFoundation.hardhat-solidity`    |
| **JavaScript / TypeScript / React / Vue / Flutter (Web)** | `esbenp.prettier-vscode`              |
| **PHP**                                                   | `bmewburn.vscode-intelephense-client` |
| **Python**                                                | `ms-python.black-formatter`           |
| **Dart / Flutter**                                        | `Dart-Code.flutter`                   |
| **Kotlin**                                                | `fwcd.kotlin`                         |
| **Java**                                                  | `redhat.java`                         |
| **C / C++**                                               | `ms-vscode.cpptools`                  |
| **Go**                                                    | `golang.go`                           |
| **C#**                                                    | `ms-dotnettools.csharp`               |
| **Rust**                                                  | `rust-lang.rust-analyzer`             |
| **HTML / CSS / Markdown / JSON / YAML**                   | `esbenp.prettier-vscode`              |

Here's how I setup in `settings.json`:

```json
"[solidity]": {
    "editor.defaultFormatter": "NomicFoundation.hardhat-solidity",
    "editor.tabSize": 4,
  },
  "[javascript]": {
    "editor.maxTokenizationLineLength": 2500,
    "editor.tabSize": 2,
  },
  "[typescript]": {
    "editor.tabSize": 2,
  },
  "[javascriptreact]": {
    "editor.tabSize": 2,
  },
  "[typescriptreact]": {
    "editor.tabSize": 2,
  },
  "[vue]": {
    "editor.tabSize": 2,
  },
  "[php]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "bmewburn.vscode-intelephense-client",
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4,
  },
```

I'm not configure all language yet cause I'm currently on some of these languages. Probably will add later. Notice that not all languages need a json config, some of them like my dotnet c# is configured automatically as well as my go.
