var google = require('googleapis')
var googleAuth = require('google-auth-library')

var SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

// Get the credentials from https://console.developers.google.com/apis/credentials?project=node-apatitejs
// Download the JSON file and paste contents below
var credentials = {
    installed: {
        client_id: 'FROM_LINK_ABOVE',
        client_secret: 'FROM_LINK_ABOVE',
        redirect_uris: 'FROM_LINK_ABOVE',
        project_id: 'FROM_LINK_ABOVE',
        auth_uri: 'FROM_LINK_ABOVE',
        token_uri: 'FROM_LINK_ABOVE',
        auth_provider_x509_cert_url: 'FROM_LINK_ABOVE'
    }
}

function authorize() {
    var clientSecret = credentials.installed.client_secret
    var clientId = credentials.installed.client_id
    var redirectUrl = credentials.installed.redirect_uris[0]
    var auth = new googleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
    getNewToken(oauth2Client)
}

function getNewToken(oauth2Client) {
    //FirstStep: Uncomment the following comments and comment out everything else in this method, execute.
    //SecondStep: Copy the the url, paste it in browser, copy the key
    //ThirdStep: Comment out the following again and cncomment the lines commented out in FirstStep, initialize the key from the clipboard (copied in SecondStep), execute.  
/*   var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    })
    console.log(authUrl)
*/
 
    var key = 'past_key_here'
    oauth2Client.getToken(key, function(err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err)
            return
        }
        oauth2Client.credentials = token
        console.log(token)
    });
}

authorize()