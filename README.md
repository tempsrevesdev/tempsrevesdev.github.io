# README #


### SPRING CLICK OFFICIAL WEBSITE ###
* Front-end development documentation
* 前端開發指令


### START ###

* STEP 1
* Only install package.json once after you git clone
```
npm install
```


* STEP 2
* Run Development version when you program
```
npm run build:dev
```


* STEP 3
* Please run Production version before you git push
* 每次推 code 之前請先編譯成上線版本
```
npm run build:prod
```


### ALL SCRIPTS MEANING ###

#
```
npm run build:dev
```
* Only build once in development mode, it will not minify files.
* 只編譯一次的開發模式，不壓縮檔案


# 
```
npm run build:prod
```
* Only build once in production mode, it will minifiy html, js, css. And remove all console.log()
* 只編譯一次的上線模式，會壓縮 html, js, css，並移除所有的 console.log()


# 
```
npm run watch
```
* Continue compile and watch your file modified in development mode.
* 持續監聽檔案更動並編譯，開發模式不壓縮
