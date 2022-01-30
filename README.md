# Cryptoid Gui
The next version of [Cryptoid Gui](https://github.com/LeedsRaspJam/Cryptoid-Python) written as a web application.

## Tools needed

- [NodeJs](https://nodejs.org/en/) (Version 16 LTS)
- [pnpm](https://pnpm.io/installation)

## Running

First install dependancies for the whole of the repo: 
```bash 
pnpm install
```

### Backend

```bash
cd packages/cryptoid-backend
pnpm tsc
pnpm start
```

The backend will now be running on port 8080. It is run the same in a production environment.

### Frontend

```bash 
cd packages/cryptoid-frontend
pnpm dev
```

The frontend will now be running on port 3000. In production you will need to build the svelte site for production:
```bash
pnpm build
cd build
node index.js
```
