const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const moduleDir = path.dirname(__filename);
const hellosFilePath = path.join(moduleDir, 'hello.txt');

function activate(context) {
    console.log('Congratulations, your module "hello" is now active!');

	let disposable = vscode.commands.registerCommand('openHelloTxt', () => {
		if(!fs.existsSync(hellosFilePath))
		{
			fs.writeFileSync(hellosFilePath, 'One greeting per line, do not appear blank lines, this line can be deleted', 'utf-8');
		}
		vscode.workspace.openTextDocument(vscode.Uri.file(hellosFilePath)).then((document) => {
			vscode.window.showTextDocument(document);
		}).catch((error) => {
			vscode.window.showErrorMessage(`Failed to open text file: ${error.message}`);
		});
	});
	context.subscriptions.push(disposable);

	// DONE: default
    if(vscode.workspace.getConfiguration().get('hello.1.hello') === 'default')
	{
		let USER_ID = vscode.workspace.getConfiguration().get('hello.2.id');
		const currentDate = new Date();
		const currentHour = currentDate.getHours();
		const evening = vscode.workspace.getConfiguration().get('hello.7.evening');
		const morning = vscode.workspace.getConfiguration().get('hello.4.morning');
		const afternoon = vscode.workspace.getConfiguration().get('hello.6.afternoon');
		const midday = vscode.workspace.getConfiguration().get('hello.5.midday');
		const midnight = vscode.workspace.getConfiguration().get('hello.3.midnight');
		if(currentHour >= 18)
		{
			vscode.window.showInformationMessage(`晚上好${USER_ID}, ${evening}`);
		}
		else if(currentHour >= 14 && currentHour < 18)
		{
			vscode.window.showInformationMessage(`下午好${USER_ID}, ${afternoon}`);
		}
		else if(currentHour >= 11 && currentHour < 14)
		{
			vscode.window.showInformationMessage(`中午好${USER_ID}, ${midday}`);
		}
		else if(currentHour >= 5 && currentHour < 11)
		{
			vscode.window.showInformationMessage(`早上好${USER_ID}, ${morning}`);
		}
		else
		{
			vscode.window.showInformationMessage(`很晚了${USER_ID}, ${midnight}`);
		}
	}

	// DONE: random
	else if(vscode.workspace.getConfiguration().get('hello.1.hello') === 'random')
	{
		console.log(hellosFilePath);
    	function getHellos()
    	{
        	const hellos = fs.readFileSync(hellosFilePath, 'utf8').split('\n');
        	return hellos.filter(hello => hello.trim() !== '');
    	}
    	function getRandomHello()
    	{
        	const hellos = getHellos();
        	const randomIndex = Math.floor(Math.random() * hellos.length);
        	console.log(randomIndex);
        	return hellos[randomIndex];
    	}
    	const hello = getRandomHello();
    	vscode.window.showInformationMessage(hello);
	}

}

exports.activate = activate;