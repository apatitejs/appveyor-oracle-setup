var google = require('googleapis')
var googleAuth = require('google-auth-library')
var fs = require('fs')
var env = process.env
var credentials = {
    client_id: env.GDRV_CLIENT_ID,
    client_secret: env.GDRV_CLIENT_SECRET,
    redirect_uris: [env.GDRV_REDIRECT_URIS],
    project_id: env.GDRV_PROJECT_ID,
    auth_uri: env.GDRV_AUTH_URI,
    token_uri: env.GDRV_TOKEN_URI,
    auth_provider_x509_cert_url: env.GDRV_AUTH_PROVIDER_X509_CERT_URL
}

var token = {
    access_token: env.GDRV_ACCESS_TOKEN,
    token_type: env.GDRV_TOKEN_TYPE,
    refresh_token: env.GDRV_REFRESH_TOKEN,
    expiry_date: Number(env.GDRV_EXPIRY_DATE)
}

var clientSecret = credentials.client_secret
var clientId = credentials.client_id
var redirectUrl = credentials.redirect_uris[0]
var auth = new googleAuth()
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
var googleDrive = google.drive({version: 'v3'})

oauth2Client.setCredentials(token)

var files = ['ora11gr2setup.zip.001', 'ora11gr2setup.zip.002', 'ora11gr2setup.zip.003', 'ora11gr2setup.zip.004']
function downloadOracleDB(files) {
    if (files.length === 0) {
        console.log('Download Oracle XE Complete!')
        return process.exit(0)
    }
    var currFileName = files.shift()
    var listOptions = {pageSize: 1, q: "name = '" + currFileName + "'", fields: 'files(id, name)', auth: oauth2Client}
    googleDrive.files.list(listOptions, function(err, response) {
        if (err) {
            console.log(err)
            return
        }
        downloadFiles(response.files[0])
    })
}

function downloadFiles(file) {
    var dest = fs.createWriteStream('./temp/' + file.name)
    googleDrive.files.get({fileId: file.id, auth: oauth2Client, alt: 'media'})
    .on('error', function(err) {
        console.log('Error during download')
        console.log(err)
        process.exit(1)
    })
    .pipe(dest)

    dest
    .on('finish', function () {
        downloadOracleDB(files)
    })
    .on('error', function (err) {
        console.log('Error during writing the downloaded file.')
        console.log(err)
        process.exit(1)
    })
}

downloadOracleDB(files)