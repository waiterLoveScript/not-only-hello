const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your module "highlight" is now active!');

    const todoType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgb(252, 211, 55)',		//柠檬黄
		isWholeLine: false
	});

	const fixmeType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgb(244, 62, 6)',			//银朱
		isWholeLine: false
	});

	const bugType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgb(248, 179, 127)',		//玫瑰粉
		isWholeLine: false
	});

	const doneType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgb(34, 148, 83)',		//孔雀绿
		isWholeLine: false
	});

	const xxxType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgb(36, 134, 185)',		//宝石蓝
		isWholeLine: false
	});


	// BUG: You must manually open a file to enable highlighting
    const highlight1 = vscode.workspace.onDidOpenTextDocument(document => {
		if
		(
			document.languageId === 'c' ||
			document.languageId === 'cpp' ||
			document.languageId === 'py')
		{
			console.log('active document change!!!!!');
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
					activeEditor.setDecorations(todoType, ranges);
				}
			}  
		}
	});


    const highlight2 = vscode.window.onDidChangeActiveTextEditor((editor) => {
		if(editor && (
			editor.document.languageId === 'c' ||
			editor.document.languageId === 'cpp' ||
			editor.document.languageId === 'javascript' ||
			editor.document.languageId === 'typescript' ||
			editor.document.languageId === 'java'))
		{
			console.log('active editor change!');
			const doc = editor.document;


      		const todoRanges = getTODOComments(doc);
			const fixmeRanges = getFIXMEComments(doc);
			const bugRanges = getBUGComments(doc);
			const doneRanges = getDONEComments(doc);
			const xxxRanges = getXXXComments(doc);


			if(vscode.workspace.getConfiguration().get('highlight.1.if'))
			{
				editor.setDecorations(todoType, todoRanges);
      			editor.setDecorations(fixmeType, fixmeRanges);
				editor.setDecorations(bugType, bugRanges);
				editor.setDecorations(doneType, doneRanges);
				editor.setDecorations(xxxType, xxxRanges);
			}


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
			function getFIXMEComments(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*FIXME:.*/g;
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
			function getBUGComments(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*BUG:.*/g;
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
			function getDONEComments(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*DONE:.*/g;
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
			function getXXXComments(document)
			{
				const text = document.getText();
				const regex = /\/\/\s*XXX:.*/g;
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

	context.subscriptions.push(highlight1);
	context.subscriptions.push(highlight2);

}

exports.activate = activate;