const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('runExe', uri => {
        console.log('Congratulations, your module "exec" is now active!');
        const regFilePath = 'runExe/runReg.reg';
        const exePath = uri.path.substring(1);
        console.log(exePath);
        /*exec(exePath, (error, stdout, stderr) => {
            if(error)
            {
                console.error(`Error executing ${exePath}: ${error.message}`);
                return;
            }
            console.log(`Standard output: ${stdout}`);
            console.error(`Standard error: ${stderr}`);
        });*/
        /*exec('runExe/runReg.bat', (error, stdout, stderr) => {
            if(error)
            {
                console.error(`Error executing batch file: ${error.message}`);
                return;
            }
            console.log(`Execution successful. Standard output: ${stdout}`);
            console.error(`Execution successful. Standard error: ${stderr}`);

            exec(`runExe/runExe.bat "${exePath}"`, (error, stdout, stderr) => {
                if(error)
                {
                    console.error(`Error executing batch file: ${error.message}`);
                    return;
                }
                console.log(`Execution successful. Standard output: ${stdout}`);
                console.error(`Execution successful. Standard error: ${stderr}`);
            });
        });*/

        exec(`regedit /s ${regFilePath} ${exePath}`, (error, stdout, stderr) => {
            if(error)
            {
                console.error(`Error executing .reg file: ${error.message}`);
                return;
            }
            console.log(`Execution successful. Standard output: ${stdout}`);
            console.error(`Execution successful. Standard error: ${stderr}`);
        });
    });
    context.subscriptions.push(disposable);
}

exports.activate = activate;