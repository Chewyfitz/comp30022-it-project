# /API/

How do I use the API?
What data can I send to the API?
How do I make my cookies light and fluffy?

At least 2 of those questions are answered here!

## Root (/api/)

### Send here:

    GET     : Not respected
    POST    : Not respected
    PUT     : Not respected
    PATCH   : Not respected
    DELETE  : Not respected

... Don't send anything here

### Returns:

Doesn't return anything...

### Comment:

This won't return anything. I'm not sure what it *even would* return if you sent it something.

## Login (/api/login)

### Send Here:

    POST : authorization header with a valid email and password
    POST : email and password as plaintext parameters if you don't care about security

### Returns:

A user object to be stored by the front end.

### Comment:

This route will change slightly once authentication is properly implemented

## Register (/api/register) or (/api/signup)

### Send Here:

    POST : authorization header with a valid email and password
    POST : email and password as plaintext paramters if you don't care about security

### Returns:

A user object to be stored by the front end.

### Comment:

This route will also change once authentication is properly implemented.

## /api/image/
```
POST    : ?user=[userId]&image=[imageURI]
```
create a link in the image database to an external url (for example imgur)  
returns status OK when image has been created.

```
POST    : ?user=[userId]
   BODY : form-data { file: [files] }
```
Upload images to Google Cloud Storage and add to the user's photos  
returns status OK when files have been received. (Upload not necessarily complete)  
(Note that you'll need to get the ids from somewhere else - they'll be added to the un-album eventually)

## /api/image/:imageId  
### Send here:
```
GET     : Get specified photo entry
DELETE  : Delete photo entry
```
### Returns:
```
GET     : Photo info JSON (includes direct link to photo)
DELETE  : Status Code
```
### Comment:  
For dealing with images.  
    Uploads, Labels, GETs, etc. should be sent here.  
  
## /api/image/:imageId/view (final url path name tbd)  
### Send here:
```
    GET     : Image ID
```
### Returns:
```
    GET     : Direct Image URL String
```
### Comment:  
For directly getting an image with a given ID.

## /api/album/:albumId
(albumID optional for POST - and maybe GET? could return a list of albums easily)  
### Send here:

```
GET     : Get specified Album (overview info)
POST    : Create new Album
PUT     : Modify Album info // PATCH Preferred
PATCH   : Modify Album info
DELETE  : Delete Album
```

### Returns:

```
GET     : Album info JSON
POST    : Album info JSON
PUT     : Album info JSON
PATCH   : Status
DELETE  : Status
```

### Comment:
For dealing with albums.  
Creating, Adding photos, etc. should be sent here.

## /api/album/:albumId/:pageId
(pageID optional for POST)  
### Send here:

```
GET     : Get specified Album Page
POST    : Create new Album Page
PUT     : Change Album Page info
PATCH   : Change Album Page info
DELETE  : Delete Page
```

### Returns:

```
GET     : Album Page JSON
POST    : URL of new Page
PUT     : Album Page JSON
PATCH   : Status
DELETE  : Status
```

### Comment:
Extension of albumId, will return an album page


## /api/user/

This route is for things that deal with user-based properties, such as verifying emails, updating passwords, and changing any other related user details.

Authorization is required for this route in the form of a user token. You can get one of these by calling /api/login with an email and password

### Send here:

    GET     : Auth Header + own uid (query)
    PATCH   : Auth Header + query detail change // Change a few details (specify)
    DELETE  : Auth Header + own uid (query) // Delete a user

### Returns:

    GET     : User information (All)
    PATCH   : 200 OK on success
    DELETE  : 204 OK on success

### Comment:

For dealing with user properties.

## /api/user/email

### Send here:

    PATCH        : Auth Header + new email address
    POST         : Auth Header + new email address (might not get implemented)
    POST /verify : Auth Header + current email address (most likely)

### Returns:

    200 OK on success

### Comment:

For dealing specifically with email addresses, since they are one of the key identifiers of an account.

## /api/user/password

### Send Here:

    PUT          : Auth header + new password
    POST         : email address (auth optional)
    POST /{code} : code + new password (query) // update password with email code

### Returns:

    PUT          : 204 OK on success
    POST         : 200 OK on success
    POST /{code} : 200 OK on success // Password reset is complete, need to log in

### Comment

For changing passwords, mostly.