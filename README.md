![Deploy to Firebase Hosting on merge](https://github.com/jcmelchorp/escuela-rafael-diaz-serdan/workflows/Deploy%20to%20Firebase%20Hosting/badge.svg?branch=main)

<h1> <a href="http://rds.edu.mx">
 </a> Sistema RDS
 </h1>
Angular webapp for Manage User accounts from Google's Admin Directory. Domain user's entities adapted to fit "Escuela Rafael Díaz Serdan" requirements (personal data, students and teachers block enrollment, manage groups and courses, view and edit information as an Admin and Superadmin in Google Workspace, and many more).
 <img src="src/assets/images/rds-draw03.svg">

### Comming soon

Create school grades reports from Google Classroom submissions.

## Documentation and Demo

See Documentation for this project at: [Escuela RDS Doc](https://jcmelchorp.github.io/escuela-rafael-diaz-serdan/).

See Demo app for this project at: [Escuela RDS](https://rds.edu.mx).

## Features

- Angular 12
- Angular Material 12 with custom theme and dark theme
- NGRX State Management 12 (@ngrx/route-store & @ngrx/data)
- Angular FontAwesome 5.15.1
- Angular Flex-layout 12
- Full Angular PWA 12
- Lasy Loading & SEO.
- Ngx-bootstrap 6.2.0 with Bootstrap 5.0.2
- Google API Auth2 (via GAPI with @types/gapi.auth2) & and Firebase Authentication
- Google Classroom Client (via GAPI with @types/gapi.client.classroom)
- Google Firebase for FireHosting
- Google Firebase Real-Time Database & Firestore
- CompoDoc for automated documentation.
- Angular PWA assets generator for icons.

## Screenshots

![](src/assets/screenshots/screenshot01.png)

**Fig. 1** - View example

![](src/assets/screenshots/screenshot02.png)

**Fig. 2** - View example

![](src/assets/screenshots/screenshot03.png)

**Fig. 3** - View example

![](src/assets/screenshots/screenshot04.png)

**Fig. 4** - View example

![](src/assets/screenshots/screenshot05.png)

**Fig. 5** - View example

![](src/assets/screenshots/screenshot06.png)

**Fig. 6** - View example

![](src/assets/screenshots/screenshot07.png)

**Fig. 7** - View example

## Install this repository

If you want to use this repository as a template, run:

```bash
git clone https://github.com/jcmelchorp/escuela-rafael-diaz-serdan.git
```

then, enter the workspace directory:

```bash
cd escuela-rafael-diaz-serdan
```

and install NPM packages:

```bash
npm install
```

## Build requirements

This repository has the following pre-requisites:

- [NodeJS](https://nodejs.org/)
- [Google Firebase](https://firebase.google.com/) Account (optional for Hosting and further features)
- [Angular CLI](https://cli.angular.io/)

The Angular CLI, CompoDoc, PWA asset generator comes with NPM install. If you want to use Angular CLI as a shell command:

```bash
npm i -g @angular/cli
```

### Documentation

By default, this project generate documentation with Material Theme in _docs/_ directory.

To generate documentation:

```bash
 npm run doc:g
```

### Deployment

Build in production environment and deploy on Google Firebase

```bash
npm run deploy
```

### Reset project to default

To reset project just type:

```bash
npm run reset
```

### PWA Assets Generator

To generate Apple icons, MS-Tiles and splash run:

```bash
npm run pwa:asset-std-logo
```
