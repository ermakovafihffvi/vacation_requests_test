# Requirements
- Node.js ^20.19.0 or >=22.12.0
- npm ^10.0.0

# How to run
```sh
npm install
```

```sh
npm run dev
```

Project will run on `localhost:5173`, and send `api` requests on `localhost:3000`

# Description
This is a `Vue3` project with standart structure and routing, built with `Vite`. It uses `pinia` storage, `PrimeVue`/`Tailwindcss` for the frontend, and `axios` for sending requests. 
- `api.js` - object with used axios requests
- `stores/` - pinia stores (`users` and `vacations`)

On the start page you will need to choose ~~your fighter~~ a user (=role 'Requestor/Validator'). 
- `Requestor` interface allows to view all your requests and submit another one.
- - `Validator` interface shows a list of users, after selecting one of them you can view this user's vacation requests sorted with the new ones first. From the list or requests you can approve it without a comment or reject with adding a comment.

## TO DO (possible improvements)
There could be added a propper authorization, with corresponding middlewares on routes on the backend side. There should be also pagination, sorting and filtration for displaying vacation requests list.
