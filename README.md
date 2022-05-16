# BSMLUCASReact
REACTJS code for the BSM robot's interface and motor control.
This github does not have all the functional code. Ask whoever is working on it if you want a complete file as a zip, but as is it is too large to upload
This runs on REACTJs, So most of the missing code is just frame code for that, aka the nodeModules file
To upload to the robot, you need to:
1. make any frontend changes in the frontend files
2. run node run build in your terminal (requires nodeJs to be installed)
3. Make any backend changes in the backend files (backend version of index.js)
4. add the frontend build file created by Build to the backend folder (NMDriver) as a folder named build
5. remove the current version of the code from the pi
6. restart the pi
7. upload the new version of the code
8. restart the pi
9. test the code
