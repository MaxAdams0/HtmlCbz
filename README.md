# HtmlCbz
A html/js in-browser .cbz comic/manga file viewer<br>
Mainly intended for use in school/work where apps and other websites are probably blocked, but use it however you'd like!

## How to use
- Go to [https://maxadams0.github.io/HtmlCbz](https://maxadams0.github.io/HtmlCbz)
- Go to [https://htmlcbz.pages.dev/](https://htmlcbz.pages.dev/)
- Run it through browser ( just open index.html )
- By using the Google Docs feature 'Apps Script' ( follow instructions below )

## How to create Google Docs deployment using Apps Script
### 7 steps but they're not hard, promise

> 1. Create a new doc
> 2. Go to `Extensions -> Apps Script` ( it will open a new tab )
> 3. Under the `Files` section, there should be a `Code.gs` file
> 4. Make 3 other files named `Index.html`, `Styles.html`, and `Scripts.html` ( make sure the first letters are capitalized )
> 5. In Github, go to the `/GAS` folder and copy/paste the contents of `Code.gs`, `Index.html`, `Styles.html`, `Scripts.html` into the files you made in Apps Script
> 6. Go back to the Google Doc and refresh
> 7. If a new menu tab should appear called `Cbz Reader`, you're good to go! Have fun avoiding classwork!

## Features
- Load any .Cbz file
- Page counter

## Planned Features
- Automatic GAS updater (so I don't have to manually copy over changes, has no user benefit besides reliability)
- Fix zoom changing page #
- Better UI
- Custom css styles
- Preference menu?
- ~~More ways to access (for school lol)~~ Google docs & alt. website available
