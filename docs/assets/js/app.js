// For simplicity, we're using jQuery for some things
//   However, the library has no jQuery dependency
$(document).ready(function(){
    // Initialize library
    FSE.init({
        // Parameters obtained by registering an app, these are specific to the SE
        //   documentation site
        clientId: 3,
        key: 'wjD0jJU7EuKP3kGvJyhYvA((',
        // Used for cross domain communication, it will be validated
        channelUrl: 'https://abhinavojhafinastra.github.io/stack-bulk-update/proxy',
        // Called when all initialization is finished
        complete: function(data) {
            $('#login-button')
                .removeAttr('disabled')
                .text('Generate Token');
        }
    });

    // Attach click handler to login button
    $('#login-button').click(function() {

        // Make the authentication call, note that being in an onclick handler
        //   is important; most browsers will hide windows opened without a
        //   'click blessing'
        FSE.authenticate({
            success: function(data) {
                alert(
                    'User Authorized with account id = ' +
                    data.networkUsers[0].account_id + ', got access token = ' +
                    data.accessToken
                );
            },
            error: function(data) {
                alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);
            },
            scope: ['read_inbox', 'private_info']
        });
    });
});