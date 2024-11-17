# YouTube oAuth

> [!CAUTION]
> This Project will no longer be supported.
> Please dont use it anymore or you lost your YouTube Account.

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

> [!IMPORTANT]  
> ***close the Terminal after bun installation***

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

> [!CAUTION]
> Do ***NOT*** copy values with CTRL + C or you will cancel the script process.
> 
> Please copy the values by marking the Text and then make a rightlick on it.


This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
