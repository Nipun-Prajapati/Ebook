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









