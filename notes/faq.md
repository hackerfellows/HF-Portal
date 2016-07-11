# Frequently Asked Questions
FAQ file for common problems

## 1. `npm` gives install errors
Specifically for me it was giving an error whenever I tried to run the server 
saying it couldn't find the module 'isobject', even though that wasn't in the 
package.json. You can maybe fix this by clearing the npm cash then reinstalling 
the modules:
```
rm -rf node_modules
npm cache clear
npm install
```
Hope that helped, and if not then may god help us all.
