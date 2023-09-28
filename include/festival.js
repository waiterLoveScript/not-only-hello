const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

async function activate(context) {

    const Path = path.join(context.extensionPath, 'resources', 'config', 'festival');
    const confPath = path.join(Path, 'a.txt');
    const conf = fs.readFileSync(confPath, 'utf-8').split('\n');
    const Arg = conf.filter(e => e.trim() !== '');
    const festivalDate = [
        '2023/09/29'
    ];

    /**
     * @param {string} festival 
     */
    function getFestival(festival)
    {
        const festivalPath = path.join(Path, `${festival}.html`);
        const content = fs.readFileSync(festivalPath, 'utf-8');
        const panel = vscode.window.createWebviewPanel(
            `${festival}`,
            `${festival}`,
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        panel.webview.html = content;
    }

    async function updateConfig()
    {
        const choice = await vscode.window.showInformationMessage(
            '是否今天不再显示此页面？',
            'Yes',
            'No'
        );
        if(choice === 'Yes')
        {
            fs.writeFile(confPath, '', (err) => {
                if (err) throw err;
            });
        }
    }

    if(vscode.workspace.getConfiguration().get('festival') === true)
    {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}/${month}/${day}`

        if(date === festivalDate[0] && Arg[0] === 'true')
        {
            getFestival('midAutumn');
            updateConfig();
        }
        else if(!festivalDate.includes(date))
        {
            fs.writeFile(confPath, 'true', (err) => {
                if (err) throw err;
            });
        }
    }

}

exports.activate = activate;