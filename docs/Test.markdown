---
layout: page
permalink: /test/
title: Test
---
<div class="container-fluid">
    <form action="#" class="needs-validation" id="xls-upload-form">
        <div class="row">
            <div class="col col-3">
                <input type="file" id="fileToUploadXLS" class="form-control" required>
                <div class="invalid-feedback">Please upload a XLS file.</div>
            </div>
            <div class="col col-2">
                <button type="submit" class="btn btn-primary stick-to-end" id="btnUploadFileXLS">Create Questions</button>
            </div>
        </div>
    </form>
</div>
<br>
<div class="container-fluid">
    <textarea class="form-control" rows=5 cols=120 id="xlx_json"></textarea>
</div>