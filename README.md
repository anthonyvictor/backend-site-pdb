# <div align="center">Pizzaria Delicia da Bahia</div>

<div align="center"><img src="https://i.ibb.co/7KrK8Ky/api-site-delicia.png" alt="home" border="0"></div>

<div align="center">
    <a href="https://preview-backend-site-pdb.onrender.com/">
        <img src="https://img.shields.io/badge/preview-render-a.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/anthonyvictor/frontend-site-pdb">
        <img src="https://img.shields.io/badge/frontend-github-blue.svg?style=for-the-badge">
    </a>
</div>
<div align="center">
     <a>
        <img src="https://img.shields.io/github/package-json/license/anthonyvictor/backend-site-pdb">
    </a>
     <a>
        <img src="https://img.shields.io/github/package-json/v/anthonyvictor/backend-site-pdb">
    </a>
    <a>
        <img src="https://img.shields.io/badge/node-18.14.2-yellow.svg">
    </a>
    <a href="https://github.com/anthonyvictor/backend-site-pdb">
        <img src="https://img.shields.io/badge/status-active-success.svg">
    </a>
    <a href="https://github.com/anthonyvictor/backend-site-pdb/issues">
        <img src="https://img.shields.io/github/issues/anthonyvictor/backend-site-pdb">
    </a>
    <a href="https://github.com/anthonyvictor/backend-site-pdb/pulls">
        <img src="https://img.shields.io/github/issues-pr/anthonyvictor/backend-site-pdb">
    </a>
</div>

### Introduction
Backend of Pizzaria Delicia da Bahia's website developed with `Node.js`

### Getting Started
1 - Clone the project, and install the dependencies.
```bash
git clone https://github.com/anthonyvictor/backend-website-pdb.git
npm install || yarn 
```
2 - Rename the `.env.example` file to `.env`.
3 - Add variables to `.env` file:

```
# Application
APP_PORT=your_port

# Set 'api' for external database or 'local' for local database with node-json-db (default)
REPO_LOCATION=local

# Those variables are necessary when REPO_LOCATION is specified as 'api'
API_URL=your_api_url
API_KEY=your_api_key

# Set this variable the password for authorize user to manage database through backend
CONFIG_PASSWORD=your_password
```
3 - Run the following command
```bash
cd backend
npm run dev || yarn dev
```
### Endpoints
```
├─/auth
├─/bebidas
├─/lanches
├─/pizzas
| ├───/tamanhos
| ├───/sabores
| └───/grupos
├─/bairros
├─/enderecos
├─/taxa
└─────────────────
```
### Tags
`node.js` `express` `axios` `node-json-db` `uuid`
