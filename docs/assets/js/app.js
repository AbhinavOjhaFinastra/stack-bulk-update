// For simplicity, we're using jQuery for some things
//   However, the library has no jQuery dependency
$(document).ready(function(){

    // Attach click handler to login button
    $('#login-button').click(function() {
        FSE.init({
            // Parameters obtained by registering an app, these are specific to the SE
            //   documentation site
            clientId: $('#clientId').val(),
            key: $('#clientKey').val(),
            // Used for cross domain communication, it will be validated
            channelUrl: 'https://abhinavojhafinastra.github.io/stack-bulk-update/',
            appDomain: 'https://abhinavojhafinastra.github.io',
            appBase: 'stack-bulk-update',
            // Called when all initialization is finished
            complete: function(data) {
                $('#login-button')
                    .removeAttr('disabled')
                    .text('Generate Token');
            }
        });

        // Make the authentication call, note that being in an onclick handler
        //   is important; most browsers will hide windows opened without a
        //   'click blessing'
        FSE.authenticate({
            success: function(data) {
                $('#generated-token').text(data.accessToken);
            },
            error: function(data) {
                alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);
            },
            scope: ['write_access']
        });
    });
});