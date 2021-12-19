# Plants Website
***
## Table of Contents:
1- Trello
2- [ Routes. ](#routes)




[Trello For BackEnd](https://trello.com/b/BJPpSSK5/backend)





<a name="routes"></a>
## Routes
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
## ER diagrm
## Models
## UML diagram

