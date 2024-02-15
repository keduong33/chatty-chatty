# Chatty Chatty

``A Language Learning Chatbot``

## Run Locally

### Installation

```bash
npm i
```

Since the app using Netlify Functions for backend, you will need to

```bash
npm i -g netlify-cli
```

### Usage

Since `@gradio/client` has breaking bugs right now (v.0.12.0), we are using OpenAI instead. To setup

```bash
cp .env.template .env
```

Supply your OpenAI API key

#### UI only

```bash
npm run dev
```

#### Backend & Frontend

```bash
netlify dev
```

## Other READMEs

* [Backend](backend/README.md)

## TODO

* Add toast for some notifations
  * Empty Input --> Form validation
  * Failures
* More detailed Error Response Handling?

## References

- Checkout my friend's [blog ](https://jason-siu-portfolio.vercel.app/article/chattychatty)about it
- The previous verision of the [app](https://github.com/keduong33/ChattyChatty-old)
