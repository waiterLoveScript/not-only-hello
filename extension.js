// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//const vscode = require('vscode');
const hello = require('./include/hello');
const information = require('./include/information');
const highlight = require('./include/highlight');
const exec = require('./include/exec');
let output = true;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * 激活函数
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Not Only Hello" is now active!');


	information.activate(context);


	highlight.activate(context);


	exec.activate(context);


	hello.activate(context);
}


// This method is called when your extension is deactivated
function deactivate() {
	if(output)
	{
		output.clear();
		output.dispose();
	}
}

module.exports = {
	activate,
	deactivate
}
