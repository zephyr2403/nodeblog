# nodeblog
A Blogging Platform Built on **NodeJs** at *backend*, uses **Jade** as *template engine*,**MongoDB** as *Database* and **Semantic-UI** for creating *UI*.

### Features:  
* After Registering User can Add Post  
* Provides an inbuilt editor for creating, customising and enhancing posts.  
* User can filter posts by category  
* User can add comment to post  
* Registered Users can see their profile 

### Make sure following tasks are performed before using :

Create <MongoDB> database nodeblog with a collection posts  
##### Use the following commands  
```
db.use('nodeblog')
db.createCollection('posts')
db.createCollection('users')
```
Download and place the dist folder of semantic UI and animate.css inside public/stylesheets/  
Download and place Ckeditor in public/ckeditor **don't remove** the file which is already inside this folder  
Place jquery-1.9.1.js and semantic.min.js inside public/javascripts  

### How To Use:

After Cloning Go the Folder and install all the dependencies using `npm install`   
Then use `npm start` to start the server  
navigate to http://localhost:3000
