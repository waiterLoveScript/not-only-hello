const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');

const userHome = os.homedir();
const configFolderPath = path.join(userHome, 'AppData', 'Roaming', 'Code', 'User', 'globalStorage', 'lovescript.not-only-hello', 'welcome');
const welcomePagePath = path.join(configFolderPath, 'welcome.html');
const dirPath = path.dirname(welcomePagePath);
console.log(welcomePagePath);
console.log(dirPath);

function activate(context) {
    const disposable = vscode.commands.registerCommand('showWelcome', () => {
        const welcomeDefaultPath = path.join(context.extensionPath, 'resources', 'config', 'welcome', 'welcome.html');
        console.log(welcomeDefaultPath);

        if(!fs.existsSync(dirPath))
		{
			fs.mkdirSync(dirPath, {recursive : true});
		}
        if(!fs.existsSync(welcomePagePath))
        {
            const defaultContent = fs.readFileSync(welcomeDefaultPath, 'utf-8');
            fs.writeFileSync(welcomePagePath, defaultContent);
        }

        const content = fs.readFileSync(welcomePagePath, 'utf-8');
        const panel = vscode.window.createWebviewPanel(
            'welcomePage',
            'Welcome Page',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        panel.webview.html = content;
    });
    context.subscriptions.push(disposable);

    /*if(vscode.workspace.getConfiguration().get('welcome') === true && !vscode.window.activeTextEditor)
    {
        vscode.commands.executeCommand('showWelcome');
        //vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(welcomePagePath));
    }*/
}

exports.activate = activate;