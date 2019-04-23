//faceupload API implementation.
Parse.Cloud.define('faceUpload', function(req, res) {

//get config 
Parse.Config.get().then(function(config) {
    const username = config.get("iam_userName");
    const password = config.get("iam_password");
    const domainname = config.get("iam_domainName");
    const projectid  = config.get("projectID");

    //Get the valid token from the IAM service.
    var reqToken = require('request');
    var token;
    var tokenBody = {
        "auth": {
            "identity": {
               
                "password": {
                    "user": {
                        "name": username, 
                        "password": password, 
                        "domain": {
                            "name": domainname
                        }
                    }
                },
                 "methods": [
                    "password"
                ]
            }, 
            "scope": {
                "project": {
                    "name": "cn-north-1"
                }
            }
        }
    };

    var reqFaceUpload = require('request');
    var bodyFaceUpload = {
      "image_base64": req.params.path,
      "external_image_id": "imageID1",
      "external_fields": {
         "timestamp": 12,
         "id": "home"
      }
    };

    reqToken({
        url: 'https://iam.cn-north-1.myhuaweicloud.com/v3/auth/tokens',
        method: "POST",
        "rejectUnauthorized": false,
        headers: {'Content-Type' : 'application/json'},
        json: true,
        body: tokenBody
    }, function (error, response, body){
        if (error) {
            res.error(error);
        }
        else {
            token =  response.headers['x-subject-token'];
        
            reqFaceUpload({
            url: 'https://face.cn-north-1.myhuaweicloud.com/v1/' + projectid + '/face-sets/'+req.params.imageLibrary+'/faces',
            method: "POST",
            "rejectUnauthorized": false,
            headers: {'Content-Type' : 'application/json', 'X-Auth-Token': token},
            json: true,
            body: bodyFaceUpload
            }, function (error, response, body){
                if (error) {
                    res.error("FAIL");
                }
                else {
                    res.success("SUCCESS");
                }
            });
        }
    });

    }, function(error) {
        res.error(error);
    });
});