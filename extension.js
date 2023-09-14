// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//const path = require('path');
//const fs = require('fs');

const hello = require('./include/hello');
const information = require('./include/information');

//let output = true;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * 激活函数
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello" is now active!');

	const decorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'yellow',
		isWholeLine: true
	});
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	/*const disposable = vscode.commands.registerCommand('fileConfig', uri => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log('Hello from hello!');

		const Path = uri.path.substring(1);*/

		/**
		 * 将字符串的第一个字母大写
		 * @param {String} str 
		 * @returns 
		 */
		/*function capitalizeFirstLetter(str) {
			if(str.length === 0)
			{
			  	return str;
			}
			const firstChar = str.charAt(0).toUpperCase();
			const restOfString = str.slice(1);
			const capitalizedString = firstChar + restOfString;
			return capitalizedString;
		}*/

		/**
		 * 除法保留两位小数
		 * @param {number} number1 
		 * @param {number} number2 
		 * @returns 
		 */
		/*function divideAndRound(number1, number2) {
			const result = number1 / number2;
			const roundedResult = result.toFixed(2);
			return roundedResult;
		}

		fs.stat(Path, (err, stats) => {
			if(err)
			{
				vscode.window.showInformationMessage(`Error${err}`);
			}
			if(stats.isDirectory())
			{
				//vscode.window.showInformationMessage(`${capitalizeFirstLetter(Path)} is not a file!`);
				function getFolderSize(folderPath) {
					let totalSize = 0;
					function getFileSize(filePath) {
					const stat = fs.statSync(filePath);
					if(stat.isFile())
					{
						totalSize += stat.size;
					}
					if(stat.isDirectory())
					{
						const files = fs.readdirSync(filePath);
						files.forEach(file => {
						  	const fullPath = path.join(filePath, file);
						  	getFileSize(fullPath);
						});
					  }
					}
					getFileSize(folderPath);
					return totalSize;
				}
				const size = getFolderSize(Path);
				//console.log(size);
				const creatTime = stats.birthtime.toLocaleString();
				const modifyTime = stats.mtime.toLocaleString();
				output = vscode.window.createOutputChannel('文件夹信息');
				if(parseFloat(divideAndRound(size, 1024)) > parseInt('1024'))
				{
					output.appendLine (`
						文件夹大小为：${divideAndRound(size, 1024*1024)}MiB
						文件夹创建于：${creatTime}
						文件夹修改于：${modifyTime}
						文件夹路径为：${capitalizeFirstLetter(Path)}`
					);
					output.show(true);
				}
				else
				{
					output.appendLine (`
						文件夹大小为：${divideAndRound(size, 1024)}KiB
						文件夹创建于：${creatTime}
						文件夹修改于：${modifyTime}
						文件夹路径为：${capitalizeFirstLetter(Path)}`
					);
					output.show(true);
				}
			}
			if(stats.isFile())
			{
				const size = stats.size;
				const creatTime = stats.birthtime.toLocaleString();
				const modifyTime = stats.mtime.toLocaleString();
				output = vscode.window.createOutputChannel('文件信息');
				if(parseFloat(divideAndRound(size, 1024)) > parseInt('1024'))
				{
					output.appendLine (`
						文件大小为：${divideAndRound(size, 1024*1024)}MiB
						文件创建于：${creatTime}
						文件修改于：${modifyTime}
						文件路径为：${capitalizeFirstLetter(Path)}`
					);
					output.show(true);
				}
				else
				{
					output.appendLine (`
						文件大小为：${divideAndRound(size, 1024)}KiB
						文件创建于：${creatTime}
						文件修改于：${modifyTime}
						文件路径为：${capitalizeFirstLetter(Path)}`
					);
					output.show(true);
				}
			}
		});
	});*/
	information.activate(context);



	const highlight = vscode.workspace.onDidOpenTextDocument(document => {
		if
		(
			document.languageId === 'c' ||
			document.languageId === 'cpp' ||
			document.languageId === 'py')
		{
			console.log('active editor change!!!!!');
			enableTODOHighlighting(document);
			function enableTODOHighlighting(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*TODO:.*/g;
				let match;
				const ranges = [];
				while((match = regex.exec(text)))
				{
					const startPos = document.positionAt(match.index);
					const endPos = document.positionAt(match.index + match[0].length);
					const decoration = {
						range: new vscode.Range(startPos, endPos)
					};
					ranges.push(decoration);
				}
				const activeEditor = vscode.window.activeTextEditor;
				if(activeEditor && activeEditor.document === document)
				{
					activeEditor.setDecorations(decorationType, ranges);
				}
			}  
		}
	});


	//context.subscriptions.push(disposable);
	context.subscriptions.push(highlight);
	

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		if(editor && (
			editor.document.languageId === 'c' ||
			editor.document.languageId === 'cpp' ||
			editor.document.languageId === 'py'))
		{
			console.log('active editor change!');
			const doc = editor.document;
      		const todoRanges = getTODOComments(doc);
      		editor.setDecorations(decorationType, todoRanges);

			
			function getTODOComments(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*TODO:.*/g;
				let match;
				const ranges = [];
				while((match = regex.exec(text)))
				{
					const startPos = document.positionAt(match.index);
					const endPos = document.positionAt(match.index + match[0].length);
					const range = new vscode.Range(startPos, endPos);
					ranges.push(range);
				}
				return ranges;
			}
		}
	});


	hello.activate(context);
}


// This method is called when your extension is deactivated
function deactivate() {
	/*if(output)
	{
		output.clear();
		output.dispose();
	}*/
}

module.exports = {
	activate,
	deactivate
}
