const vscode = require('vscode');
//const { exec } = require('child_process');
//const { execFile } = require('child_process');

async function activate(context) {
    let disposable = vscode.commands.registerCommand('runExe', uri => {
        console.log('Congratulations, your module "exec" is now active!');
        //const regFilePath = 'runExe/runReg.reg';
        const exePath = uri.path.substring(1);
        //const testPath = "start D:/MyCode/DevCpp/bin/test.exe";
        //const args = [];
        console.log(exePath);
        //let command = `start "" "${exePath}"`;
        const terminal = vscode.window.createTerminal({
            shellPath: "cmd.exe",
            //shellArgs: ['-NoExit', '-Command', command]
        });
        //let commandCompleted = false;

        try
        {
            terminal.sendText(`start "" "${exePath}"`);
            //terminal.dispose();
            //setTimeout(() => { terminal.dispose(); }, 5000);
            /*terminal.onDidClose(() => {
                console.log("Terminal closed");
            });*/
            console.log(terminal.processId);
        }
        catch(error)
        {
            console.error("ERROR!", error);
        }
        const interval = setInterval(() => {
            if(!terminal.processId)
            {
                terminal.dispose();
                clearInterval(interval);
            }
        }, 1000);
        

        // XXX: Why this code doesn't run correctly
        /*terminal.onDidExitProcess((e) => {
            if(e.exitCode === 0)
            {
                commandCompleted = true;
            }
            else
            {
                vscode.window.showErrorMessage('Failed!');
            }
        });
        while(!commandCompleted)
        {
            new Promise(resolve => setTimeout(resolve, 100));
        }
        terminal.dispose();*/


        // XXX: Why this code doesn't run correctly
        /*execFile("cmd", [testPath], (error, stdout, stderr) => {
            console.log('successful!');
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


        /*exec(`regedit /s ${regFilePath} ${exePath}`, (error, stdout, stderr) => {
            if(error)
            {
                console.error(`Error executing .reg file: ${error.message}`);
                return;
            }
            console.log(`Execution successful. Standard output: ${stdout}`);
            console.error(`Execution successful. Standard error: ${stderr}`);
        });*/


    });
    context.subscriptions.push(disposable);
}

exports.activate = activate;