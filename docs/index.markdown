---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<div class="container-fluid">
    <form action="#" class="needs-validation" id="bulk-update-form">
        <div class="row">
            <div class="col col-1">
                <input placeholder="Client Id" type="text" id="clientId" class="form-control" required>
                <div class="invalid-feedback">Please enter a valid Client Id.</div>
            </div>
            <div class="col col-2">
                <input placeholder="Key" type="text" id="clientKey" class="form-control" required>
                <div class="invalid-feedback">Please enter a valid Key.</div>
            </div>
            <div class="col col-3">
                <input type="file" id="fileToUpload" class="form-control" required>
                <div class="invalid-feedback">Please upload a CSV file.</div>
            </div>
            <div class="col col-2">
                <input disabled placeholder="Generated Token" type="text" id="generated-token" class="form-control">
            </div>
            <div class="col col-2">
                <button type="submit" class="btn btn-primary stick-to-end" id="btnUploadFile">Create Questions</button>
            </div>
        </div>
    </form>
</div>
<div id="uploadProgressDiv" style="display: none; margin-top: 20px;" class="progress">
    <div id="uploadProgress" class="progress-bar progress-bar-striped" style="width:0%"></div>
</div>
<div class="container-fluid">
    <br>
    <div style="display: none;" id="bulkUpdateResult">
        <!-- Nav tabs -->
        <ul class="container-fluid nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a style="text-decoration:none" class="nav-link active" data-bs-toggle="tab" href="#createdQuesTab">Created</a>
          </li>
          <li class="nav-item">
            <a style="text-decoration:none" class="nav-link" data-bs-toggle="tab" href="#failedQuesTab">
                Failed <sup><span style="display: none;" id="errorBadge" class="badge rounded-pill bg-danger">Error</span></sup>
            </a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div id="createdQuesTab" class="tab-pane active table-responsive csv-table" style="margin-top: 20px;">
                <table class="table table-bordered table-hover table-striped">
                    <thead><tr><th>Title</th><th>Body</th><th>Tags</th><th>Link</th></tr></thead>
                    <tbody id="createdQues"></tbody>
                </table>
            </div>
            <div id="failedQuesTab" class="tab-pane fade table-responsive csv-table" style="margin-top: 20px;">
                <table class="table table-bordered table-hover table-striped">
                    <thead><tr><th>Title</th><th>Body</th><th>Tags</th><th>Error</th></tr></thead>
                    <tbody id="failedQues"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>