#!/usr/bin/env node

"use strict";// ES2015

const fs = require("fs")
const argv = require('minimist')(process.argv.slice(2))

// build for jsDelivr by default
argv.cleanup = argv.c || argv.cleanup

/*
 Build temp files, update .*ignore files to prevent accitental uploads
*/
if (!argv.cleanup) {
  let packageInfo = JSON.parse( read("package.json") )
  const REPO = packageInfo.repository.url.replace("git:","http:").replace(".git","")

  /* info.ini */
  let infoINI = `author = "${packageInfo.author.name}"
github = "${REPO}"
homepage = "${packageInfo.homepage}"
description = "${packageInfo.description}"
mainfile = "<primary-minified.js|css>"`;
  writeTmp("info.ini", infoINI)

  /* update.json for automatic updating on jsDelivr */
  let updateJson = ` {
  "packageManager": "github",
  "name": "${packageInfo.name}",
  "repo": "${REPO}",
  "files": {
    "basePath": "<dir>",
    "include": ["<glob-string-1>", "<glob-string-2>"],
    "exclude": ["<glob-string-3>"]
  }
}`;
  writeTmp("update.json", updateJson)

  /* add to ``.*ignore` */
  addIgnores(".gitignore")
  addIgnores(".npmignore")

  function addIgnores(fn) {
    // set it bad
    let ignore = new Set( read(fn).toString().split("\n") )  //Using ES2015 Set to prevent duplicates
    if ( ignore.has("info.ini") && ignore.has("update.json") ) {
      console.log(`${fn} not updated since no changes were needed`)
    } else {
      // ensure ignores are clumped together
	    ignore.delete("#jsDelivr CDN configurations: info.ini & update.json")
      ignore.delete("info.ini")
      ignore.delete("update.json")
			ignore.add("#jsDelivr CDN configurations: info.ini & update.json")
      ignore.add("info.ini")
      ignore.add("update.json")
      writeSet(fn, ignore)
    };
  };

	console.log(`Edit in "info.ini" the 'mainfile' field, &
  in "update.json" the 'files' fields.
Use only names for minified files in the "files": indclude: <glob-string>s.
Please fix items that are "undefined".
Then upload into: "jsdelivr/files/${packageInfo.name}"
  (or orginal project folder if already on jsdelivr).
Details @ https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md
`)

} else { // argv.cleanup
  fs.unlinkSync("info.ini")
  fs.unlinkSync("update.json")
  removeIgnores(".gitignore")
  removeIgnores(".npmignore")

  function removeIgnores(fn) {
    let ignore = new Set( read(fn).toString().split("\n") )
    ignore.delete("#jsDelivr CDN configurations: info.ini & update.json")
    ignore.delete("info.ini")
    ignore.delete("update.json")
    writeSet(fn, ignore)
  };
  console.log(`"info.ini" & "update.json" are deleted.`)
}

/*
  global functions
*/

function read(fp) {
  if (!fs.existsSync(fp)) {
    return "";
  }
  return fs.readFileSync(fp, "utf8");
};

function writeSet(fp, set1d) {  // ignore is Set
  let output = ""
  for (let item of set1d) output += item +"\n"
  output = output.slice(0, -1)  //remove extra blank line at end
  fs.writeFile(fp, output +"\n", function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log(`"${fp}" is updated.`);
    }
  });
};

function writeTmp(fn, text) {
  fs.writeFile(fn, text, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log(`"${fn}" ready for editing.`);
    }
  });
};
