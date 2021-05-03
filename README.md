# envedit
This CLI including parse .env file, replace value, base64 value support.

### Usage
```shell
$ npx envedit -l test=hello_world -b64
```

### Help

```
$ npx envedit -h                                                   
usage: envedit [-h] [-v] [-s SOURCE] [-l FROM_LITERAL] [-f FROM_FILE]
               [-b64 | --base64 | --no-base64]

Argparse example

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -s SOURCE, --source SOURCE
                        Env file path
  -l FROM_LITERAL, --from-literal FROM_LITERAL
                        Set env file key value from literal
  -f FROM_FILE, --from-file FROM_FILE
                        Set env file key value from file
  -b64, --base64, --no-base64
                        Format value on base64
```

  
## Join us on Slack

For questions and support please [join our community](https://docs.google.com/forms/d/e/1FAIpQLSdkwt5pxmyCZQO0AmyAghBOdA-XBG298Pfm5Dw1xjNGaGeCYQ/viewform).


## Author
  - Amirhossein Movahedi

## License

This project is licensed under the MIT License