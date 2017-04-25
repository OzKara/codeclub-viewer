export function buildPDF() {
/*
  var head = document.getElementsByTagName('head')[0];
  var script_pdf = document.createElement('script');
  var script_canvas = document.createElement('script');
  script_canvas.type = 'text/javascript';
  script_pdf.type = 'text/javascript';
  script_pdf.src = '../../node_modules/jspdf/jspdf.debug.js';
  script_canvas.src = '../../node_modules/html2canvas/html2canvas.js';
  head.appendChild(script_pdf);
  head.appendChild(script_canvas);*/

  const jsPDF = require('jspdf');
  const html2canvas = require('html2canvas');
  
  //let html = document.getElementsByTagName("body")[0];
  let html = document.getElementsByTagName("body")[0].querySelectorAll("[class^=Lesson__container]");

  //var canvas = html2canvas(html);

  html2canvas(html, {
    allowTaint: true,
    onrendered: function(canvas) {
      let converter = new jsPDF('p', 'mm', 'a4');
      let width = converter.internal.pageSize.width;
      let height = converter.internal.pageSize.height;
      //converter.fromHTML(`<canvas>${canvas}</canvas>`);

      let i = new Image();
      i.src = canvas.toDataURL('image/png');
      console.log("converted");
      i.onload = function() {
        callback(i);
      };
      let ratio = (canvas.width/width);

      for (let page = 0; page*ratio<(canvas.height/height); page++) {
        //let canvasTemp = document.createElement('canvas');
        //canvasTemp.height = height;
        //canvasTemp.width = width;        
        //canvasTemp.getContext('2d').drawImage(i, 0, (page*height)*ratio, canvas.width, height*ratio, 0, 0, width, height);
        //let iTemp = canvasTemp.toDataURL('image/png');
      
        i.src = canvas.toDataURL('image/png');
        converter.addImage(i, 'PNG', 0, 0, width, height);
        converter.addPage();
      }

      /*let pageHeight = converter.internal.pageSize.height;
      var height = canvas.height;
      let y = 0 // Height position of new content
      let i = 1;
      while (height>=y*i) {
        if (y >= pageHeight) {
          converter.addImage(image, 'JPEG', 0, y*i, 0, 0);
          converter.addPage();
          y = 0 // Restart height position
          i+=1;
        }
        y+=1;
      }*/

      //converter.addImage(i, 'PNG', 0, 0, 10, 10);
      console.log('added'); 
      document.body.appendChild(canvas);

      console.log('added child');
      converter.save('a4.pdf');
    }
  });


  //let con = document.getElementById('canvas').toDataURL('image/png');
  //converter.addImage(con, 'PNG', 15, 40, 180, 160);


/*
  converter.addHTML(canvas, 15, 15, null, {
    'width': 170,
  }, function() {converter.save('a4.pdf');});

  /*converter.addHTML(html2canvas(html, {
    onrendered: function(canvas) {
      return canvas;
    }
  }), 15, 15, {
    'width': 170,
  },function() {  converter.save('a4.pdf');});*/
}