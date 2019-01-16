# helometer

How far to the nearest station?

If you know the city well, you already know *where* the stations are. But which is *closest* (as the crow flies) to where you are now?

https://hugovk.github.io/helometer

## How to test locally

In another terminal:
```bash
$ python3 -m http.server 8060

# Or:

$ python2 -m SimpleHTTPServer 8060

```

Then to allow geoposition to work in a non-HTTPS browser:

```bash
/usr/bin/open -n "/Applications/Google Chrome.app" --args "http://0.0.0.0:8060" --unsafely-treat-insecure-origin-as-secure="http://0.0.0.0:8060" --user-data-dir=/tmp/testprofile
```
