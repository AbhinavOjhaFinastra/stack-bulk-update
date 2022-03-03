---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
description: You can find the Client ID and Key by navigating to your user's API Access Key section
---
<div class="container-fluid">
    <header class="post-header">
      <h4 class="form-text text-muted">{{ page.description | escape }}</h4>
    </header>
    <div class="row">
        <div class="col col-1">
            <input placeholder="Client Id" type="text" id="clientId" class="form-control">
        </div>
        <div class="col col-2">
            <input placeholder="Key" type="text" id="clientKey" class="form-control">
        </div>
        <div class="col col-2">
            <button id="login-button" class="btn btn-primary">Login</button>
        </div>
        <div class="col col-3">
            <input type="file" id="fileToUpload" class="form-control">
        </div>
        <div class="col col-2">
            <input disabled placeholder="Generated Token" type="text" id="generated-token" class="form-control">
        </div>
        <div class="col col-2">
            <button type="button" class="btn btn-info" id="btnUploadFile">Upload File</button>
        </div>
    </div>
    <div class="table-responsive col-md-12 csv-table" style="margin-top: 20px;">
        <table class="table table-bordered table-hover table-striped"></table>
    </div>
</div>