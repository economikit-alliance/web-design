# Economikit website theme

## Building

[NodeJS](https://nodejs.org/) and [Rollup](https://www.rollupjs.org/) used to bundle the site scripts. `npm run build` to recompile scripts, `npm run dev` to run a development server that recompiles on file changes.

[Hugo Extended](https://gohugo.io/) used to build the site. Simply use `hugo` to build, `hugo serve` to run development server.

## Deploying

Linked as a submodule of the [website content repo](https://github.com/economikit-alliance/website). Clone the content repo with `--recursive`, then run `npm i` to setup your development environment.

1. Complete build steps (above).
2. You should see updates in the `public/` directory. `cd public` and commit & push all changes, which will propagate to the [final website repo](https://github.com/economikit-alliance/economikit-alliance.github.io). This is all that is required- GH pages serves to our main domain via CNAME records.

## License

CC-BY-SA 4.0. See `CC-BY-SA.txt` for details.
