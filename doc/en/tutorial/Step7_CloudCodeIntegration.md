## Step 7: Enterprise  Integration: Cloud Code 

This demo uses cloud code functions to invoke image upload,retrieval service as for complex apps sometimes you just need a bit of logic that isn’t running on a mobile device. 
Cloud Code makes this possible.
Cloud Code is easy to use because it’s built on the same Parse JavaScript SDK that powers thousands of apps.
The only difference is that this code runs in your Parse Server rather than running on the user’s mobile device.
When you update your Cloud Code, it becomes available to all mobile environments instantly.
You don’t have to wait for a new release of your application.This lets you change app behavior on the fly and add new features faster.

### Configuration:
To access the huawei cloud  Face Recognition services like face upload and face retrieve, we need to get the valid authentication token from IAM service.
Here the link to get the valid authentication token from IAM service.
https://support.huaweicloud.com/en-us/api-face/face_02_0004.html

To get the authentication token we should provide valid **username**, **password** and **domain name**.    

1) Open the mbaas console(http://{mbaas-host}:{port}) and click the configuration tab.
 ![Alt text](./imgs/config1.png?raw=true "config")
2) Add the configuration parameters **username**, **password** and **domain name** and **project id**.
  
   Note: Project id is required to use the Face Recognition Service Apis.
   Refer to https://support.huaweicloud.com/en-us/api-face/face_02_0056.html for details about how to obtain the Project id.
   
 ![Alt text](./imgs/config2.png?raw=true "config")
 ![Alt text](./imgs/config3.png?raw=true "config")
 
3) To read the configuration parameters in the cloud code use the below code.
```
    //this code need to add in cloud code for geting the configuration.
    Parse.Config.get().then(function(config) {
        const username = config.get("userName");
        const password = config.get("password");
        const domainname = config.get("domainName");
        const projectid  = config.get("projectID");
    }, function(error) {
        res.error(error);
    });

```
4) Add **Parse.serverURL** path to main.js
 ![Alt text](./imgs/main.png?raw=true "main")
 
Below are the three cloud code functions used in this demo.

### Face Library:
1) Add function from MbaaS console Enterprise Integration -> Add Function.

![Alt text](./imgs/upload1.png?raw=true "upload")

2) Upload the cloud function code. Get code for Face library from https://github.com/CPE-OAuth/servicestage-face-recognition-mobileapp-example/tree/master/cloud-code/faceLibrary.js

![Alt text](./imgs/upload2.png?raw=true "upload")

3) After the upload you can view and modify the cloud code in mbaas console.

![Alt text](./imgs/upload3.png?raw=true "upload")

4) Cloud function can be verified from postman. REST API: http://{mbaas-host-ip}:{mbaas-port}/mbaas/functions/faceLibrary
![Alt text](./imgs/postmancall.png?raw=true "postmancall")


### Face Upload
1) Add function from MbaaS console Enterprise Integration -> Add Function.

![Alt text](./imgs/upload1.png?raw=true "upload")

2) Upload the cloud function code. Get code for Face library from http://rnd-gitlab-ca-g.huawei.com/PaaS/servicestage/services/facerecodemo/blob/master/cloud-code/faceUpload.js 

![Alt text](./imgs/upload2.png?raw=true "upload")

3) After the upload you can view and modify the cloud code in mbaas console.

![Alt text](./imgs/upload3.png?raw=true "upload")

4) Cloud function can be verified from postman. REST API: http://{mbaas-host-ip}:{mbaas-port}/mbaas/functions/faceUpload
![Alt text](./imgs/postmancall.png?raw=true "postmancall")


### Face Retrieve
1) Add function from MbaaS console Enterprise Integration -> Add Function.

![Alt text](./imgs/upload1.png?raw=true "upload")

2) Upload the cloud function code. Get code for Face library from http://rnd-gitlab-ca-g.huawei.com/PaaS/servicestage/services/facerecodemo/blob/master/cloud-code/faceRetrieve.js 

![Alt text](./imgs/upload2.png?raw=true "upload")

3) After the upload you can view and modify the cloud code in mbaas console.

![Alt text](./imgs/upload3.png?raw=true "upload")

4) Cloud function can be verified from postman. REST API: http://{mbaas-host-ip}:{mbaas-port}/mbaas/functions/faceRetrieve
![Alt text](./imgs/postmancall.png?raw=true "postmancall")
