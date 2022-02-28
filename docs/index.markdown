---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/stackOverflowAuth.js"></script>
<script src="{{ site.baseurl }}/assets/js/app.js"></script>
<script src="{{ site.baseurl }}/assets/js/readCSV.js"></script>

<div class="container" style="margin-top: 30px;">
    <div class="col-md-4">
        Client Id - <input type="text" id="clientId" class="form-control">
        Key - <input type="text" id="clientKey" class="form-control">
        You can find the Client ID and Key by navigating to your user's API Access Key section: [Finastra Stack Enterprise](https://finastra.stackenterprise.co)
    </div>
    <div class="col-md-4">
        <button id="login-button">Login</button>
    </div>
    <div class="col-md-4">
        <span id="generated-token"></span>
    </div>
</div>

<div class="container" style="margin-top: 30px;">
    <div class="col-md-4">
        <input type="file" id="fileToUpload" class="form-control">
    </div>
    <div class="col-md-4">
        <button type="button" class="btn btn-info btn-lg" id="btnUploadFile">Upload File</button>
    </div>
    <div class="table-responsive col-md-12 csv-table" style="margin-top: 20px;">
        <table class="table table-bordered table-hover table-striped"></table>
    </div>
</div>