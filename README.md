This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and modified with some useful utilities, components, and settings that we ([Input Logic](https://github.com/inputlogic)) often need.

## Local development

Start by creating a `.env.local` file in the project root. You can use the [1Password Generator](https://1password.com/password-generator/) to create a random session secret easily.

```
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_API_URL=http://localhost:8000 or http://localhost:8000/api depending on your setup
SESSION_SECRET=[RANDOM-32-CHARACTER-STRING]
```

Now install and run the project:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Connect to the API

Now that your frontend is running, you'll need an API. For a local development API, setup the [Django API Starter](https://github.com/inputlogic/django-api-starter).

If you'd like to skip this step, simply update your `.env.local` file to point to our staging API on Heroku:

```
NEXT_PUBLIC_API_URL=https://django-api-starter.herokuapp.com
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [React useState](https://reactjs.org/docs/hooks-state.html) - learn about the useState hook in React
- [React useEffect](https://reactjs.org/docs/hooks-effect.html) - learn about the useEffect hook in React

## Storybook

Next Starter supports Storybook, a component documentation tool. Adding stories for components is entirely optional, but it is encouraged for any components that are reused in many locations.

run storybook:

```
npm run storybook
```

see [https://storybook.js.org/](https://storybook.js.org/) for more info.

## Package Development

If you are making changes to an npm package that is being used in this project, you might run into issues such as hot-reload not working, or peer dependency issues.
Here are the steps that should make it a relatively pain-free process.

1. Install [yalc](https://github.com/wclr/yalc)
2. From the directory of the package you want to work on, run `yalc publish`
3. In the next project, add the .env variable `DEV_PACKAGE_MODE=true`
4. In the next project, run `yalc add <package_name>` where `<package_name>` is the value for `name` in your package's package.json file.
5. Notice that package.json in this next project will have a yalc url for the package version. Make sure you don't merge this into production, it should always be switched back to a normal version number before the code is merged in.
6. In your package's build process, you will want to make sure when the files change it bundles the code, and then calls `yalc push`. You could use nodemon for watching the files, or bunjs has a built in --watch command. Here is an example bun build script:

```
import dts from 'bun-plugin-dts'
import 'index.ts'  // This is imported so that bun will watch for changes to the package

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  plugins: [dts()]
})

console.log('built', Date.now())

await Bun.spawn(['yalc', 'push'])

console.log('yalc push complete')

```

7. When you are done working on the package and changes are published to npm, remove the yalc version of the package `yalc remove <package_name>` then install the new package version eg. `npm install --save <package_name>`. If your package changes aren't ready for prime-time, you can publish with a tag (eg next) so that your changes are not considered the latest stable version.
