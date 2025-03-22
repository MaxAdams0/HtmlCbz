function onOpen() {
  DocumentApp.getUi()
	.createMenu('CBZ Reader')
	.addItem('Open', 'showSidebar')
	.addToUi();
}


function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Index')
	  .evaluate()
	  .setWidth(1900) // maximize resolution
	  .setHeight(900);
  DocumentApp.getUi().showModalDialog(html, 'Cbz Reader');
}


// Helper function to include other HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
