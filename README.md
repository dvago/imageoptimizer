# imageoptimizer 

This script resizes, compress and minify jpg images based on single or multiple formats defined by the user.
The quality is already defined to fit the best quality/filesize ratio.

Assuming you have already set up your machine with node, before launch the script you must install the dependencies through **npm i**

###How to run the script:

```javascript
  ~: node app.js -p "C:\SomeFolder\SomeSubfolder" -s "format" -a "alias" -e "excluded folders"
```

_ex. node app.js -p "C:\Users\Username\Pictures" -s "400x550,120x280,320x150" -a "Thumbnails,ProfilePics,Covers" -e "cache,temp"_

###Flags:

**-h** helper 

**-p** define the path of your folder, note: the script is recursive 

**-s** define the sizes you want create

**-a** define the folder name you want create inside the path specified using -p flag

**-e** define the subfolder name you want to exclude from scan
