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
    <div class="table-responsive col-md-12 csv-table" style="margin-top: 20px;">
        <table class="table table-bordered table-hover table-striped"></table>
    </div>
</div>