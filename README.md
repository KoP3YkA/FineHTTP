# FineHTTP

This is a simple library that will help you type standard fetch and automate some actions.

## Using

To send a request, simply call the request (or safeRequest) method in the FineHTTP class, passing parameters to it.

```typescript
const response: IRequestSuccessResult<'json'> = await FineHTTP.request({
    url: 'http://ur.url-or-ip.com',
    method: 'post',
    query: { id: 1, userId: "John" }
})
```

In the URL you specify the IP or domain of the resource (adding the endpoint if it is a server). Then you specify the http method (standardly get). The query given in the example transforms the request into this form:
`http://ur.url-or-ip.com?id=1&userId=John`

The fundamental difference between safeRequest and request is that safeRequest handles exceptions itself and returns the IRequestExceptionResult interface containing the error. To check which interface was returned, just check response.ok. If true, then SuccessResult, if false, then ExceptionResult

```typescript
const response: IRequestSuccessResult<'text'> | IRequestExceptionResult = await FineHTTP.safeRequest({
    url: 'http://1.0.0.1',
    responseType: 'text'
})
if (response.ok) {
    /* if it is SuccessQuery */
} else {
    /* or else */
}
```

### Below is a description of all the items in IRequestParams.

**url** - this is the URL to the resource where you want to send the HTTP request. If it is a server, be sure to specify the endpoint itself

**method** - http method. For example, post, get, patch, etc.

**body** - request body. It can include Record, ArrayBuffer, etc. Important: contentType is not set automatically, specify it separately.

**contentType** - content type, will be specified in the request header automatically

**accept** - adds an "Accept" header to the request to select the desired content type

**headers** - here you can list your own headers as a regular paint object

**query** - automatically append the passed values to the URL. For example, if you specified `{ name: "Peter", lastName: "Petrov" }`, this would be converted to `http"//ur_url?name=Peter&lastName=Petrov`

**responseType** - expected response type. Let's say text or json. The return type depends on this.

**auth** - will add the Authorization header itself

**retryCount** - number of attempts. Requests will be sent until a correct answer is received or this number of attempts ends. If not specified, there will be one attempt