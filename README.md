# jsdelivr-config-files

> CLI to quickly fill in files needed for jsDelivr CDN hosting.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install -g jsdelivr-config-files
```

## Usage

```sh
$ jsdelivr-configs
```
Should reply like this:
```sh
Edit in "info.ini" the 'mainfile' field, &
  in "update.json" the 'files' fields.
Use only names for minified files in the "files": indclude: <glob-string>s.
Please fix items that are "undefined".
Then upload into: "jsdelivr/files/{project-name}"
  (or orginal project folder if already on jsdelivr).
Details @ https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md

"info.ini" ready for editing.
"update.json" ready for editing.
".npmignore" is updated.
".gitignore" is updated.
$
```

After you edited the files, upload them to [jsDelivr CDN repo](https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md#web-interface-recommended).  If you want to automate the removal of local files:


```sh
$ jsdelivr-configs -cleanup
```
Should reply like this:
```sh
"info.ini" & "update.json" are deleted.
".gitignore" is updated.
".npmignore" is updated.
$
```

## Change log

* 0.3.0
  + fixed missing `http://github.com/` in `repository.url`

## Contributing

Stars welcome.
Pull requests will be considered, though keep in mind my next focus is a web-based tool, not really expanding this one (for now). For bugs and feature requests, [please create an issue](https://github.com/tombyrer/jsdelivr-config-files/issues)

## Author

**Tom Byrer**

* [github/tomByrer](https://github.com/tombyrer)
* [twitter/tomByrer](http://twitter.com/tombyrer)

## License

Copyright © 2015 [Tom Byrer](https://github.com/tomByrer)
Licensed under the MIT license.

***

## Thanks
* [readme-generator](https://github.com/tombyrer/readme-generator)
