# La Vista website

### Technologies used:
Main framework: NodeJS, React, Gatsby, Typescript, Graphql
Styling and animations: SASS, AOS
Version control: Git, Github
Demo hosting: Firebase
Deployment hosting: N/A
Domain provider: 

### Downloads
- NodeJS: https://nodejs.org/en/download/
- Git: https://git-scm.com/downloads

### Setup
1. Clone repository `git clone https://github.com/MoreeZ/lavista`
2. Navigate into repository `cd lavista`
3. Install all required local dependencies `npm install`

<details>
<summary>### Firebase setup</summary>
<br>
1. If not yet installed, install firebase tools globally using `npm i --location=global firebase-tools gatsby-cli`
2. Use `firebase login` and login in the browser to your google account.
3. Use `firebase init hosting`
  - "ready to process? (y/N)": Press Enter
  - "What do you want to use as your public directory? (public)": Press Enter
  - "Configure as a single-page app (rewrite all urls to /index.html)?": Press Enter
  - "Set up automatic builds and deploys with GitHub?": n
  - "File public/404.html already exists. Overwrite? (y/N)": Press Enter
  - "File public/index.html already exists. Overwrite? (y/N)": Press Enter
</details>



### Usage
- Development: `npm run start`
- Build website only: `npm run build`
- Preview build locally: `npm run serve`
- Build the website and host it on firebase `npm run export`