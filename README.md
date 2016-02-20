# Flight Search Engine

Front-end Development Exercise

## Getting Started

To get you started you can drop the files in any http server and access `/app/index.html`

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Testing

You can simply access the unit tests via browser at `http://localhost:8000/tests/index.html`.

### Running Unit Tests

The fseApp comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```
