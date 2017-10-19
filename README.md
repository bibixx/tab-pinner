# Frontend boilerplate

## Description
This repository is a frontend boilerplate for basic projects.

## Usage
1: Install npm (from [”https://nodejs.org/”](https://nodejs.org/)) if you haven't alerady.

2: Clone repo
```
$ git clone https://github.com/bibixx/frontend-boilerplate.git
```
3: Change directory to `frontend-boilerplate`
```
cd frontend-boilerplate
```
4: Install packages
```
$ npm i
```
5: Start gulp watcher
```
$ gulp
```

### Additional arguments
If you want to use other files than the default ones you must add their folder into *STATIC_FILES* array.

1: If you want the browsersync to open a browser tab for you when it initialises use
```
$ gulp --open
```

2: To run browsersync on top of server (eg. php one) use
```
$ gulp --proxy=localhost
```

3: If you want to run gulp in production mode simply run
```
$ gulp --production
```
