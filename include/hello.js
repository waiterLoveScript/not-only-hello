const vscode = require('vscode');

function activate() {
    console.log('Congratulations, your module "hello" is now active!');
    if(vscode.workspace.getConfiguration().get('hello.1.if'))
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
	}
}

exports.activate = activate;