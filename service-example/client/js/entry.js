window.languageItems = require('raw!../viewer-assets/languages/en-US.json');
window.htmlTemplates = {
  comment: require('raw!../viewer-assets/templates/commentTemplate.html'),
  contextMenu: require('raw!../viewer-assets/templates/contextMenuTemplate.html'),
  copyOverlay: require('raw!../viewer-assets/templates/copyOverlayTemplate.html'),
  downloadOverlay: require('raw!../viewer-assets/templates/downloadOverlayTemplate.html'),
  esignOverlay: require('raw!../viewer-assets/templates/esignOverlayTemplate.html'),
  hyperlinkMenu: require('raw!../viewer-assets/templates/hyperlinkMenuTemplate.html'),
  imageStampOverlay: require('raw!../viewer-assets/templates/imageStampOverlayTemplate.html'),
  overwriteOverlay: require('raw!../viewer-assets/templates/overwriteOverlayTemplate.html'),
  pageRedactionOverlay: require('raw!../viewer-assets/templates/pageRedactionOverlayTemplate.html'),
  printOverlay: require('raw!../viewer-assets/templates/printOverlayTemplate.html'),
  print: require('raw!../viewer-assets/templates/printTemplate.html'),
  redactionReason: require('raw!../viewer-assets/templates/redactionReasonTemplate.html'),
  unsavedChangesOverlay: require('raw!../viewer-assets/templates/unsavedChangesOverlayTemplate.html'),
  viewer: require('raw!../viewer-assets/templates/viewerTemplate.html')
};

window.jQuery = require('jquery');
window.$ = window.jQuery;