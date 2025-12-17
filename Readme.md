# Project  Setup [Learning Purpose]

### 1. Make a empty folder
```
makdir myProject
```

### 2. Initilize  a node Project
```
npm init
```

### 3. Setup Typescript
```
npm i -D typescript ts-node @types/node nodemon
```
1. nodemon restart a server 
2. ts-node is used for run a typescript file in project.
3. @types/node provide node types information.

### 4. After installtion initilize a tsconfig file.
```
npx tsc --init

// always  use npx in it.
```

### 5. Add a start script in package.json file.
```
"start" : "nodemon index.ts"
```

### 6. Setup a git repository.
```
git init

// create empty git repo.
// This will create a local repo.
```  

### 7. Add a gitignore

### 8. Setup Eslint
```
npm init @eslint/config

// It is used for node best practice.
// give a error 
```

### 9. Setup Prettier

* create a .prettierrc.json file.
* Add a configuration.
```
{
    "tabWidth": 2,
    "semi": true
}
```

### 10. Setup Express server.
```
npm i express

npm i -D @types/express
```

### 11. Install a dotenv
```
npm i dotenv

npm i -D @types/dotenv
```

### 12. Setup MongoDB with Mongoose
```
npm i mongoose

npm i -D @types/mongoose
``` 

### 13. Setup Global error handling
```
npm i http-errors
npm i -D @types/http-errors
```

### Usefull Information
- If you make a project from scratch than add a simple logic in it like in auth we add a 
one logic in it.
- When entire project build than we add a more logic in it.

- console.log("files:",req.files); => files: [Object: null prototype] {
  coverImage: [
    {
      fieldname: 'coverImage',
      originalname: 'pexels-pixabay-460775.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/home/nipun-prajapati/Desktop/API/public/uploads',
      filename: '283c1101c6313a6967c5fca6a80c40bb',
      path: '/home/nipun-prajapati/Desktop/API/public/uploads/283c1101c6313a6967c5fca6a80c40bb',
      size: 291595
    }
  ],
  file: [
    {
      fieldname: 'file',
      originalname: 'Project Documentation Format.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      destination: '/home/nipun-prajapati/Desktop/API/public/uploads',
      filename: 'f692b52a8b3d05bda8574401e31808d8',
      path: '/home/nipun-prajapati/Desktop/API/public/uploads/f692b52a8b3d05bda8574401e31808d8',
      size: 1998457
    }
  ]
}

-









