# La Vista website <a target="_blank" href="https://lavistacanoa.com">www.lavistacanoa.com<a>

### Technologies used:
<b>Main framework:</b> NodeJS, React, Gatsby, Typescript, Graphql <br/>
<b>Styling and animations:</b> SASS, AOS <br/>
<b>Version control:</b> Git, Github <br/>
<b>Demo hosting:</b> Firebase <br/>
<b>Deployment hosting:</b> Firebase <br/>
<b>Domain provider:</b> N/A <br/>

### Downloads
- NodeJS: https://nodejs.org/en/download/
- Git: https://git-scm.com/downloads

### Setup
1. Clone repository `git clone https://github.com/MoreeZ/lavista`
2. Navigate into repository `cd lavista`
3. Install all required local dependencies `npm install`

### Firebase setup

1. If not yet installed, install firebase tools globally using `npm i --location=global firebase-tools gatsby-cli`
2. Use `firebase login` and login in the browser to your google account.
3. Use `firebase init hosting`, select your project or new project if not done before
<details>
<summary>More Details HERE</summary>
<br>
<ul>
  <li>"ready to process? (y/N)": Press Enter</li>
  <li>"What do you want to use as your public directory? (public)": Press Enter</li>
  <li>"Configure as a single-page app (rewrite all urls to /index.html)?": Press Enter</li>
  <li>"Set up automatic builds and deploys with GitHub?": n</li>
  <li>"File public/404.html already exists. Overwrite? (y/N)": Press Enter</li>
  <li>"File public/index.html already exists. Overwrite? (y/N)": Press Enter</li>
</ul>
</details>



### Usage
- Development: `npm run start`
- Build website only: `npm run build`
- Preview build locally: `npm run serve`
- Build the website and host it on firebase `npm run export`