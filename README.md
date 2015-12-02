# imageoptimizer 

This script resizes, compress and minify jpg/png images based on single or multiple formats defined by the user.
The output file extension is JPG so it's not useful for images containing transparent backgrounds.

Assuming you have already set up your machine with Node JS, before launch the script you must install the dependencies through **npm i**

26 Nov 2015

Added a second layer of compression using the **Mozilla Jpeg project** (https://github.com/mozilla/mozjpeg)

02 Dec 2015

Added:
  - conversion from PNG to JPG
  - prevent the generation of files which have source sizes smaller than the output size
  - optimised the quality of cropped/resized images

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
