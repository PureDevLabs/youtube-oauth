# youtube-oauth

## Install Bun on your PC

### on Windows
  
open Powershell Terminal

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

### on MacOS or Linux

Open Terminal

```bash
curl -fsSL https://bun.sh/install | bash
```

and excute this command to install Bun. This is only required one time.

close the Terminal after that.

---

### Download the latest [Release](https://github.com/PureDevLabs/youtube-oauth/releases) of youtube-oauth and unzip it.

### on Windows
  
open cmd and navigate to the extracted folder of youtube-oauth

e.g.
```bash
cd C:\Users\Andre\Desktop\youtube-oauth
```


### on MacOS/Linux

open Terminal and navigate to the extracted folder of youtube-oauth

e.g.
```bash
cd /path/to/youtube-oauth
```

--- 

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```


This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
