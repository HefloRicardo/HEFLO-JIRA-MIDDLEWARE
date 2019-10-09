# HEFLO-JIRA-MIDDLEWARE
Middleware to make integrations between HEFLO and JIRA


# Project dependencies:
- node 10.16.3 or greater

# Setup

Execute following command:

```bash
npm install
```

Update *config.json* with JIRA parameters
```
    "JIRAHOST": "xxx.atlassian.net",
    "JIRAUSERNAME": "jira username",
    "JIRATOKEN": "jira user personal token"
```

# Compile

Execute following command:
```bash
npm run compile
```

# Deploy

This application was developed to run on AWS serverless solution (Lambda), but it can be adapted to run standalone (with an express server or a similar web server framework).

It was used the microservice-http-endpoint blueprint to create the required resources (API Gateway and endpoints) automatically.

After compiling, compress the following files and folders:
 ```
node_modules/
out/
package.json
```
Upload the zip file to AWS and set as entrypoint  `out/index.handler` 

# Routes

## **getUsers**
Get list of jira users based on a search criteria (the name of the route will be choosen at Lambda deployment time)

### Method: **GET**

### Query Parameters:
- search : search term (text, required)