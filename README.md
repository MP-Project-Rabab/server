# Plants Website

[Trello For BackEnd](https://trello.com/b/BJPpSSK5/backend)

## Routes
|Path|For|
|-----|-----|
|post("/register", register)|Register route|
|post("/login", logIn)|Login route|
|get("/activated/:token", activated)|activated email route|
|put("/forget", forgetPass)|forget Password route|
|get("/reset-pass/:res-tok", updatePass)|forget Password route|
|get("/auth/google",)|signIn with google route|
|get("/",authentication, authorization, allUser)|get users  route "for admin"|
|delete("/", authentication, authorization, deleteUser)|delete user route "for admin"|
|get('/profile',authentication)|user profile|
|post('/post',authentication, newPost)|New post route|
|put('/update',authentication, updatePost)|update post route|
|delete('/delete',authentication, deletePost)|Delete post route|
|get('/',authentication, allPost)|all post route|
|post('/add', authentication, newComment), put('/', authentication, updateComment), delete('/', authentication , deleteComment), get('/all', authentication, allComment)|comment routes|
|post("/add",authentication,addRating), get("/",authentication,allRating)|Rating routes|
|get("/",allProduct), put("/update",updateProduct), post("/add",addProduct), delete ("/delete",deleteProduct)|Products routes| 
## Models
