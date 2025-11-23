# Project  Setup

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
```






