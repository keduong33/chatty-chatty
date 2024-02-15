# Chatty Chatty
[![Netlify Status](https://api.netlify.com/api/v1/badges/a5f8f6b4-2b0f-4bb3-924a-947655ff00a2/deploy-status)](https://app.netlify.com/sites/chattychatty/deploys)

```

A Language Learning Chatbot that you can communicate through voices

```

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

[Backend](backend/README.md)

## TODO
### Must Do
* Add toast for some notifations
  * Empty Input --> Form validation
  * Failures
* Add Bot speaking
* Add Feedback button
* Add Some Tests
* Add Demo
### Optional
* Add Persistent voice recording
* More detailed Error Response Handling?

## References

- Checkout my friend's [blog ](https://jason-siu-portfolio.vercel.app/article/chattychatty)about it
- The previous verision of the [app](https://github.com/keduong33/ChattyChatty-old)
