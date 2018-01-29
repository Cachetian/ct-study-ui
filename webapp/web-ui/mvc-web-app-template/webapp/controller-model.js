var model = (function() {
  var jsonModel = null;

  function loadJSONModel() {
    $.getJSON("model.json", function(json) {
      console.log(json); // this will show the info it in firebug console
      jsonModel = json;
    });
  }

  return { // public interface
    init: function() {
      loadJSONModel();
    }
  };
})();

window.model = model;
