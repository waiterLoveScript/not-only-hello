const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

let output = true;

async function activate(context) {
    const disposable = vscode.commands.registerCommand('fileConfig', uri => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log('Congratulations, your module "information" is now active!');

		const Path = uri.path.substring(1);
		console.log(Path);

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
	});

    context.subscriptions.push(disposable);
}

exports.activate = activate;