$(document).ready(function() {
    $(document).on('submit', '#xls-upload-form', function(e) {
        e.preventDefault();

        let fileUploadXLS = $("#fileToUploadXLS").get(0);
        let filesXLS = fileUploadXLS.files;

        var xl2json = new ExcelToJSON();
        xl2json.parseExcel(filesXLS[0]);
    });

});

var ExcelToJSON = function() {

  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });

      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        console.log(workbook.Sheets[sheetName]);
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);
        jQuery('#xlx_json').val(json_object);
      })

    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};