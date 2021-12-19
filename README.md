# Plants Website
***
## Table of Contents:
1- Trello
2- [ Routes. ](#routes)




[Trello For BackEnd](https://trello.com/b/BJPpSSK5/backend)





<a name="routes"></a>
## Routes:
|HTTP Method|URL|Request Body|Success status|Error Status|Description|
|-----------|---|------------|--------------|------------|-----------|
|POST|```/user/register```|{email, username, password,phoneNumber, avatar, role}|200|400|Register route|
|POST|```/user/login```| {userName, email, password}|200|400|Login route|
|GET|```/user/activated/:token```|{token}|200|400|activated email route|
|PUT|```/user/forget```|{email}|200|400|forget Password route|
|GET|```/user/reset-pass/:res-tok```|{token}|200|400|forget Password route|
|GET|```/auth/google```|{aouth}|200|400|signIn with google route|
|GET|```/user```|{id}|200|400|get all users  route "for admin"|
|DELETE|```/user/delete```|{id}|200|400|delete user route "for admin"|
|GET|```/user/profile```|{id}|200|400|user profile|
|POST|```/posts/post```||200|400|New post route|
|PUT|```/posts/update```||200|400|update post route|
|DELETE|```/posts/delete```||200|400|Delete post route|
|GET|```/posts```||200|400|all post route|
|POST|```/comments/add```||200|400|Add new comment| 
|PUT|```/comments/update``` ||200|400|updateComment| 
|DELETE|```/comments/delete```||200|400| deleteComment)|
|GET|```/comments```||200|400|allComment|
|POST|```/rating/add```||200|400|addRating|
|GET|```/rating```||200|400|allRating||
|GET|```/product```||200|400|allProduct| 
|PUT|```/product/update```||200|400|updateProduct| 
|POST|```/product/add```||200|400|addProduct|
|DELETE|```/product/delete```||200|400|deleteProduct| 
## UML diagram
## Models:
### Role Model:

Key           |     Type               |  options           | default value
------------- | ---------------        | -----------        |------
role          |   String               | required, unique   | n/a


### User Model:
Key                      |     Type               |  options           | default value
-------------            | ---------------        | -----------        |------
email                    |   String               | required, unique   | n/a
username                 |   String               | required, unique   | n/a
password                 |   String               | required           | n/a
phoneNumber              |   String               | required, unique   | n/a
role                     |   ref.                 | required           | n/a
isDeleted                |   Boolean              |                    | false
avatar                      |   String               | required           | "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg"
location                 |   String              |                    |  n/a
certificate                |   String               |     required               | ""
cart            |   ref                |                    | []
shop          |   ref               |                    | []
service     |  ref              |                    | n/a
comment             |   ref               | required           | n/a
ready            |   String               |           | true
rating  |  ref               |                    | n/a

### Rating Model:
Key           |     Type            |  options  | default value
------------- | ---------------     | --------- |------
by            |   ref               |   | n/a
to   |   ref               | required  | n/a

### Comment Model:
Key           |     Type            |  options  | default value
------------- | ---------------     | --------- |------
by            |   ref               | required  | n/a
comment    |   String               | required  | n/a
date    |   Date               |   | Date.now
isDeleted            |   Boolean              |                    | false

### Post Model:
Key                  |     Type               |  options           | default value
-------------        | ---------------        | -----------        |------
by               |   ref                |        required            | ""
img               |   String                |                    | ""
date                 |   Date                 |                    | Date.now
describe                 |   String               | required           | n/a
isProblem                |   Boolean               | required           |false
isAdvice                 |   Boolean               | required           | false
service             |   String               |           | n/a
type             |   ref               | required           | n/a
isDeleted            |   Boolean              |                    | false

### Product Model:
Key                  |     Type               |  options           | default value
-------------        | ---------------        | -----------        |------
by               |   ref                |        required            | ""
img               |   String                |                    | ""
describe                 |   String               | required           | n/a
comment                |   ref               |            |n/a
price                 |  String                | required           | n/a
name             |   String               |    required       | n/a
rating             |   ref               |            | n/a

### Service Model:
Key           |     Type            |  options  | default value
------------- | ---------------     | --------- |------
by            |   ref               |   | n/a
name   |   String               | required  | n/a

### Status Model:
Key           |     Type            |  options  | default value
------------- | ---------------     | --------- |------
ready            |   Boolean               | required  | false
comment    |   Boolean               | required  | false
date    |   Boolean               |  required | false

## ER diagrm
![Untitled Diagram drawio](https://user-images.githubusercontent.com/92247904/146681349-4db7a955-a0bf-4c2e-88f3-e15bb49e2992.png)




