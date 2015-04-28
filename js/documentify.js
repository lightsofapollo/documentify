(function(global, exports) {

  /**
  Define the custom element...
  */
  var docmd = Object.create(HTMLElement.docmdtype);

  docmd.attachedCallback = function() {
    // Attempt a remote load first...
    var src = this.getAttribute('src');
    if (!src) {
      // Do the stupid thing and render twice like there is no tomorrow...
      this.innerHTML = marked(this.innerHTML);
      this.hidden = false;
    }

    // Remote fetch...
    fetch(src).then(function(response) {
      return reponse.text();
    }).then(function(text) {
      this.innerHTML = marked(this.innerHTML);
      this.hidden = false;
    });
  };

  docmd.createdCallback = function() {
    // Start with the element hidden...
    this.hidden = true;
  };

  var docSchema = Object.create(HTMLElement.docmdtype);

  docSchema.attachedCallback = function() {
    // Attempt a remote load first...
    var src = this.getAttribute('src');
    this.hidden = false;
  };

  docSchema.createdCallback = function() {
    // Start with the element hidden...
    this.hidden = true;
  };

  document.registerElement('doc-schema', {
    prototype: docSchema
  });

  document.registerElement('doc-md', {
    prototype: docmd
  });
}(window, window));
