// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
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
	console.log('Congratulations, your extension "hello" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('fileConfig', uri => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log('Hello from hello!');

		const filePath = uri.path.substring(1);

		/**
		 * 将字符串的第一个字母大写
		 * @param {String} str 
		 * @returns 
		 */
		function capitalizeFirstLetter(str) {
			if(str.length === 0)
			{
			  	return str;
			}
			const firstChar = str.charAt(0).toUpperCase();
			const restOfString = str.slice(1);
			const capitalizedString = firstChar + restOfString;
			return capitalizedString;
		}

		/**
		 * 除法保留两位小数
		 * @param {number} number1 
		 * @param {number} number2 
		 * @returns 
		 */
		function divideAndRound(number1, number2) {
			const result = number1 / number2;
			const roundedResult = result.toFixed(2);
			return roundedResult;
		}

		fs.stat(filePath, (err, stats) => {
			if(err)
			{
				vscode.window.showInformationMessage(`Error${err}`);
			}
			if(stats.isDirectory())
			{
				vscode.window.showInformationMessage(`${capitalizeFirstLetter(filePath)} is not a file!`);
			}
			if(stats.isFile())
			{
				const size = stats.size;
				const creatTime = stats.birthtime.toLocaleString();
				const modifyTime = stats.mtime.toLocaleString();
				output = vscode.window.createOutputChannel('文件信息');
				output.appendLine (`
					文件大小为：${divideAndRound(size, 1024)}KiB;
					文件创建于：${creatTime};
					文件修改于：${modifyTime};
					文件路径为：${capitalizeFirstLetter(filePath)};`
				);
				output.show(true);
			}
		});
	});

	/*const change = vscode.commands.registerCommand('changeID', () => {
		vscode.window.showInputBox({
		  prompt: '请输入 ID',
		  placeHolder: 'ID',
		}).then(result => {
		  if (result) {
			// 保存 ID 到 workspaceState
			vscode.workspace.getConfiguration().update('extension.id', result, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage(`ID 已修改为 ${result}`);
		  }
		});
	  });*/

	context.subscriptions.push(disposable);
	//context.subscriptions.push(change);
	

if(vscode.workspace.getConfiguration().get('hello.1.if'))
{
	//let USER_ID = getStoredId();						//用户ID，可自定义
	let USER_ID = vscode.workspace.getConfiguration().get('hello.2.id');
	/*if(typeof getStoredId() === "undefined")
	{
		USER_ID = "111";
	}
	else
	{
		USER_ID = getStoredId();
	}*/
	const currentDate = new Date();
	const currentHour = currentDate.getHours();
	const evening = vscode.workspace.getConfiguration().get('hello.7.evening');
	const morning = vscode.workspace.getConfiguration().get('hello.4.morning');
	const afternoon = vscode.workspace.getConfiguration().get('hello.6.afternoon');
	const midday = vscode.workspace.getConfiguration().get('hello.5.midday');
	const midnight = vscode.workspace.getConfiguration().get('hello.3.midnight');
	if(currentHour >= 18)
	{
		vscode.window.showInformationMessage(`晚上好${USER_ID}, ${evening}!`);
	}
	else if(currentHour >= 14 && currentHour < 18)
	{
		vscode.window.showInformationMessage(`下午好${USER_ID}, ${afternoon}!`);
	}
	else if(currentHour >= 11 && currentHour < 14)
	{
		vscode.window.showInformationMessage(`中午好${USER_ID}, ${midday}!`);
	}
	else if(currentHour >= 5 && currentHour < 11)
	{
		vscode.window.showInformationMessage(`早上好${USER_ID}, ${morning}!`);
	}
	else
	{
		vscode.window.showInformationMessage(`很晚了${USER_ID}, ${midnight}!`);
	}
	//vscode.window.showInformationMessage('Hello, LoveScript!');
	//vscode.window.showInformationMessage('加油华为！遥遥领先！');
}

	
}

/*function getStoredId() {
	// 从 workspaceState 中获取保存的 ID
	return vscode.workspace.getConfiguration().get('extension.id');
}*/

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
