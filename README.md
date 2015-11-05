# imageoptimizer 

This script resizes, compress and minify jpg images based on single or multiple formats defined by the user.
The quality is already defined to fit the best quality/filesize ratio

###How to run the script:

```javascript
  ~: node app.js -p "C:\SomeFolder\SomeSubfolder" -s "format"
```

_ex. node app.js -p "C:\Users\Username\Pictures" -s "400x550,120x280,320x150"_

###Flags:

**-h** helper 

**-p** define the path of your folder, note: the script is recursive 

**-s** define the sizes you want create
