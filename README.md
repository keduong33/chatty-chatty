# Chatty Chatty

```

A Language Learning Chatbot that you can communicate through voice speech powered by ChatGPT & OpenAI - Whipser/HuggingFace models

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

## TODO (Discontinued)

### Must Do

* Add toast for some notifications
  * ~~Nudge users to send first message~~
  * Failures
* ~~Empty Input --> Form validation~~
* Add Bot speaking
* ~~Add Feedback button~~
* Add Some Tests

### Optional

* Add Persistent voice recording
* More detailed Error Response Handling?
* ~~Add Demo~~

## References

- The previous version of the [app](https://github.com/keduong33/ChattyChatty-old)
