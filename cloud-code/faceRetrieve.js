//face retrieve API implementation
Parse.Cloud.define('faceRetrieve', function(req, res) {

//get config 
Parse.Config.get().then(function(config) {
    const username = config.get("iam_userName");
    const password = config.get("iam_password");
    const domainname = config.get("iam_domainName");
    const projectid  = config.get("projectID");

    //Get the valid token from the IAM service
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


    //call the face retrieve api
    var reqFaceRetrieve = require('request');
    var bodyFaceRetrieve = {
      "image_base64": req.params.path,
      "sort" : [
      {
          "timestamp" : "asc"
        } 
              ],
      "return_fields" : ["timestamp", "id"],
      "filter" : "timestamp:12"
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
            else
            {
                token =  response.headers['x-subject-token'];
        
                reqFaceRetrieve({
                    url: 'https://face.cn-north-1.myhuaweicloud.com/v1/' + projectid + '/face-sets/'+req.params.imageLibrary+'/search',
                    method: "POST",
                    "rejectUnauthorized": false,
                    headers: {'Content-Type' : 'application/json', 'X-Auth-Token': token},
                    json: true,
                    body: bodyFaceRetrieve
                }, function (error, response, body){
                    if (error) {
                        res.error(error);
                    }
                    else {
                        if(body.faces !== undefined && body.faces[0] !== undefined && body.faces[0].similarity !== undefined)
                        {
                            console.log('body.faces[0].similarity '+body.faces[0].similarity);
                            if (body.faces[0].similarity >= 0.6) {
                                res.success("SUCCESS");
                            }
                            else {
                                res.success("FAIL");
                            }
                        }
                        else
                        {
                            res.success("FAIL");
                        }
                    }
                });
            }
        });

    }, function(error) {
        res.error(error);
    });

});