(function () {
  'use strict'
  const MAX_SIZE = 1280;

  window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                       window.MozBlobBuilder || window.MSBlobBuilder;
  window.URL = window.URL || window.webkitURL;

  window.onload = function main() {
    var fileInput = document.getElementById('filein')

    function toast(image, width, height){
        var canvas = document.createElement('canvas')
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height)
        var toasted = new Image();
        toasted.style.width = "400px";
        toasted.src = canvas.toDataURL("image/jpeg", 0.01);
        document.body.appendChild(toasted);
    }

    function calcSize(w, h) {
      if(w > MAX_SIZE || h > MAX_SIZE){
        if(w <= h){
            w = Math.floor( w *(MAX_SIZE/h) );
            h = MAX_SIZE;
        } else {
            h = Math.floor( h *(MAX_SIZE/w) );
            w = MAX_SIZE;
        }
      }
      return {width:w,height:h}
    }

    function handleFile() {
      var file = this.files[0];
      // var img = document.createElement("img");
      var img = new Image();

      img.onload = function () {
          var size = calcSize(this.width, this.height)
          toast(this, size.width, size.height)
      }
      img.src = window.URL.createObjectURL(file);
    }

    fileInput.addEventListener('change', handleFile, false)
  }

})();
