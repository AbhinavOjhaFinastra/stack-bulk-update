---
layout: page
title: Login Success
permalink: /login_success/
---

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<div style="width:600px">
    <h2>Authorizing Application</h2>
</div>

<script>
    $(function () {
        var domain = 'https://abhinavojhafinastra.github.io';
        var proxy = 'https://abhinavojhafinastra.github.io/stack-bulk-update/';

        // see https://stackoverflow.com/a/10965203/1114
        var testContainer = document.createElement('div');
        testContainer.innerHTML = '<!--[if lte IE 9]><span></span><![endif]-->';
        var isOldIe = testContainer.getElementsByTagName('span').length === 1;

        // IE 8 and 9 support postMessage, but not between windows as we require.
        if (window.postMessage && !isOldIe) {
            // modern browsers
            window.opener.postMessage(window.location.hash, domain);
        } else {
            // old browsers
            var wrapper = $('#xdomain');
            var iframeUrl = proxy + window.location.hash;
            var iframe = $('<iframe></iframe>', { name: 'se-api-frame', src: iframeUrl });

            wrapper.append(iframe);
        }
    });
</script>

<div class="dno" id="xdomain"></div>