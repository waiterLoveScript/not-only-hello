const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('showWelcome', () => {
        // Get the path to the HTML file
        const welcomePagePath = vscode.Uri.file(
            path.join(context.extensionPath, 'resources', 'config', 'welcome', 'welcome.html')
        );
        console.log(welcomePagePath);
        // Read the HTML file content
        const content = fs.readFileSync(welcomePagePath.fsPath, 'utf-8');

        // Create and show a webview
        const panel = vscode.window.createWebviewPanel(
            'welcomePage',
            'Welcome Page',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        // Set the HTML content of the webview
        panel.webview.html = content;
    }));
}

exports.activate = activate;
