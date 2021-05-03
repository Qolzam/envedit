#!/usr/bin/env node

"use strict";

const fs = require("fs");
const { parse, stringify } = require("envfile");
const { ArgumentParser, BooleanOptionalAction } = require("argparse");
const { version } = require("./package.json");

/**
 * Get key value from input string
 * @param {string} input
 * @returns {key:string,value:string}
 */
function getKeyValue(input) {
  const splitIndex = input.indexOf("=");
  if (splitIndex > -1) {
    const key = input.split("=")[0];
    const value = input.substr(splitIndex + 1, input.length);
    return {
      key,
      value,
    };
  } else {
    return {
      key: input,
      value: input,
    };
  }
}

/**
 * Print hello text
 */
function printHello() {
    const white = "\x1b[37m"
    const red = "\x1b[31m"

    console.log('\n[',white, 'With', red, '❤',white,'by Telar',']\n')
}

/**
 * Main function
 */
function main() {
  const parser = new ArgumentParser({
    description: "Argparse example",
  });

  parser.add_argument("-v", "--version", { action: "version", version });
  parser.add_argument("-s", "--source", { help: "Env file path" });
  parser.add_argument("-l", "--from-literal", {
    action: "append",
    help: "Set env file key value from literal",
  });
  parser.add_argument("-f", "--from-file", {
    action: "append",
    help: "Set env file key value from file",
  });
  parser.add_argument("-b64", "--base64", {
    action: BooleanOptionalAction,
    help: "Format value on base64",
  });

  const args = parser.parse_args();
  printHello()

  let defaultSourcePath = ".env";
  const { source, from_literal, from_file, base64 } = args;
  if (source) {
    defaultSourcePath = source;
  }

  const envPath = args.file || defaultSourcePath;
  const envFile = fs.readFileSync(envPath, { encoding: "utf-8" });
  let parsedFile = parse(envFile);


  // Set from literal
  if (from_literal && from_literal.length) {
    from_literal.forEach((item) => {
        let {key,value} = getKeyValue(item)
        if (base64) {
            value = Buffer.from(value, 'utf-8').toString('base64')
        }
        parsedFile[key] = value
    });
  }

  
  // Set from file
  if (from_file && from_file.length) {
    from_file.forEach((item) => {
        const {key,value} = getKeyValue(item)
        let fileData = fs.readFileSync(value, {encoding: 'utf-8'})
        if (base64) {
            fileData = Buffer.from(fileData, 'utf-8').toString('base64')
        }
        parsedFile[key] = fileData
    });
  }

  fs.writeFileSync(envPath, stringify(parsedFile),{encoding: 'utf-8'})
  console.log('Change applied !')
}

main();