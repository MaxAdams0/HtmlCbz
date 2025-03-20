function onOpen() {
  DocumentApp.getUi()
	.createMenu('CBZ Reader')
	.addItem('Open Reader', 'showSidebar')
	.addToUi();
}


function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Index')
	  .evaluate()
	  .setWidth(1920)
	  .setHeight(1080);
  DocumentApp.getUi().showModalDialog(html, 'Cbz Reader');
}


// Helper function to include other HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
