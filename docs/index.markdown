---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<div class="container-fluid">
    <form action="#" class="needs-validation" id="bulk-update-form">
        <div class="row">
            <div class="col col-2">
                <input placeholder="Client Id" type="text" id="clientId" class="form-control" required>
                <div class="invalid-feedback">Please enter a valid Client Id</div>
            </div>
            <div class="col col-2">
                <input placeholder="Key" type="text" id="clientKey" class="form-control" required>
                <div class="invalid-feedback">Please enter a valid Key</div>
            </div>
            <div class="col col-3">
                <input type="file" id="fileToUpload" class="form-control" required>
                <div class="invalid-feedback">Please upload a valid CSV file</div>
            </div>
            <div class="col col-2">
                <input disabled placeholder="Generated Token" type="text" id="generated-token" class="form-control">
            </div>
            <div class="col col-1"></div>
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
                <a style="text-decoration:none" class="nav-link active" data-bs-toggle="tab" href="#createdQuesTab">Created Posts</a>
            </li>
            <li class="nav-item">
                <a style="text-decoration:none" class="nav-link" data-bs-toggle="tab" href="#failedQuesTab">
                    Failed Questions <sup><span style="display: none;" id="errorBadgeQues" class="badge rounded-pill bg-danger">Error</span></sup>
                </a>
            </li>
            <li class="nav-item">
                <a style="text-decoration:none" class="nav-link" data-bs-toggle="tab" href="#failedAnswerTab">
                    Failed Answers <sup><span style="display: none;" id="errorBadgeAns" class="badge rounded-pill bg-danger">Error</span></sup>
                </a>
            </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div id="createdQuesTab" class="tab-pane active table-responsive csv-table" style="margin-top: 20px;">
                <table class="table table-bordered table-hover table-striped post-display-table">
                    <thead>
                        <tr>
                            <th class="sticky-top" style="width: 10%;">Title</th>
                            <th class="sticky-top" style="width: 25%;">Body</th>
                            <th class="sticky-top" style="width: 10%;">Tags</th>
                            <th class="sticky-top" style="width: 15%;">Question Link</th>
                            <th class="sticky-top" style="width: 25%;">Answer</th>
                            <th class="sticky-top" style="width: 15%;">Answer Link</th>
                        </tr>
                    </thead>
                    <tbody id="createdQues"></tbody>
                </table>
            </div>
            <div id="failedQuesTab" class="tab-pane fade table-responsive csv-table" style="margin-top: 20px;">
                <table class="table table-bordered table-hover table-striped post-display-table">
                    <thead>
                        <tr>
                            <th class="sticky-top" style="width: 15%;">Title</th>
                            <th class="sticky-top" style="width: 25%;">Body</th>
                            <th class="sticky-top" style="width: 10%;">Tags</th>
                            <th class="sticky-top" style="width: 25%;">Error</th>
                            <th class="sticky-top" style="width: 25%;">Answer</th>
                        </tr>
                    </thead>
                    <tbody id="failedQues"></tbody>
                </table>
            </div>
            <div id="failedAnswerTab" class="tab-pane fade table-responsive csv-table" style="margin-top: 20px;">
                <table class="table table-bordered table-hover table-striped post-display-table">
                    <thead>
                        <tr>
                            <th class="sticky-top" style="width: 10%;">Question Id</th>
                            <th class="sticky-top" style="width: 20%;">Question Title</th>
                            <th class="sticky-top" style="width: 35%;">Answer</th>
                            <th class="sticky-top" style="width: 35%;">Error</th>
                        </tr>
                    </thead>
                    <tbody id="failedAns"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>