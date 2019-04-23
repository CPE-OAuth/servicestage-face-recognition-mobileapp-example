//face Library creation API implementation
Parse.Cloud.define('faceLibrary', function(req, res) {

//get config 
Parse.Config.get().then(function(config) {
    const username = config.get("iam_userName");
    const password = config.get("iam_password");
    const domainname = config.get("iam_domainName");
    const projectid  = config.get("projectID");

    //Get the valid token from the huawei public cloud
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
    
    var reqFaceLibr = require('request');
    var bodyFaceLibr = {
      "face_set_name": req.params.imageLibrary, 
      "face_set_capacity": 100000,
      "external_fields" : {
        "timestamp" : {
          "type" : "long"
        },
        "id" : {
          "type" : "string"
        },
        "number" : {
          "type" : "integer"
        }
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
                //call the face library
                reqFaceLibr({
                    url: 'https://face.cn-north-1.myhuaweicloud.com/v1/' + projectid + '/face-sets',
                    method: "POST",
                    "rejectUnauthorized": false,
                    headers: {'Content-Type' : 'application/json', 'X-Auth-Token': token},
                    json: true,
                    body: bodyFaceLibr
                }, function (error, response, body){
                    if(error) {
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