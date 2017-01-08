# fis3-deploy-gfe-replace
fis3-deploy-gfe-replace


## INSTALL

```bash
npm install [-g] fis3-deploy-gfe-replace
```

## USE

```js
fis.match('**', {
    deploy: [
        fis.plugin('gfe-replace', {
	        patterns: [
	            {
	                match: '__JS_DOMAIN__',
	                replacement:'//js.atguat.net.cn'
	            },
	            {
	                match: '__CSS_DOMAIN__',
	                replacement:'//css.atguat.net.cn'
	            }
	        ]
    	}),
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```