# Strapux

Scaffold Nuxt and Strapi in a few clicks, centralizes one .env for development, staging, and production. Can easily switch databases from Sqlite, Postgres, Mysql, Mongo.

#### Create Strapux app using npx
```bash 
npx create-strapux-app <my-strapux-project>
```

## Features:
### Auto environment generating
- auto generates .env for Nuxt and Strapi from master .env
- generate .env files for staging and production, to easily copy to services like Netlify and Heroku.
- 

### Database Tools 
- ```db:clone <environment> <environment>``` # clone from one environment to another, with auto dump
- ```db:dump  <environment>``` # dump environment database
- ```db:import <environment> <dump>``` # import environment database dump
- ```db:rollback <environment>```  # restore the last environment dump


## Installation
```bash 
npx create-strapux-app <my-strapux-project>
```
or a fresh install (deletes existing my-strapux-project)
```bash 
npx create-strapux-app <my-strapux-project> --freshy-install
```

```
Usage: create-strapux-app install <path>

Options:
  --oneclick            one click install
  --freshy-install      WARNING deletes path directory before installing
  -V, -v, --version     output the version number
  -h, --help            output usage information

Commands:
  create-strapux-app <path> [options]  if no path provided use current directory.
or
  npx create-strapux-app <path> [options]

```

https://github.com/jasenmichael/create-strapux-app

https://www.npmjs.com/package/create-strapux-app

https://github.com/jasenmichael/strapux

https://www.npmjs.com/package/strapux

Documentation soon...
Contribution welcome :)
