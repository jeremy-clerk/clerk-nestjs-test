
## Description

Demo project with [Clerk]('https://clerk.com) and NestJS. 

## Project setup

```bash
$ pnpm install
```

Copy or rename the [`.env.example`](.env.example) to `.env`

```bash
$ cp ./.env.example ./.env #copy

$ mv ./.env.example ./.env #rename
```

Copy your Publishable Key and Secret Key from the [Clerk dashboard](https://dashboard.clerk.com/last-active?path=api-keys)

Paste your keys into the appropriate section of the `.env` file.

## Compile and run the project

```bash
# development
$ pnpm run start
```
## Usage

Once the application is running, make a get, put or post request to the root (`http://localhost:3005`). 

If you are signed into a Clerk application with the same Publishable and Secret key on `localhost` - you'll see an output of an `auth` object. 
Otherwise, you'll see nothing or empty claims. 


## Support

This repo is provided without any warranty or guarantees. It is only an example to showcase using Clerk with NestJS. 

## Info

- Author - Jeremy Wright

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
