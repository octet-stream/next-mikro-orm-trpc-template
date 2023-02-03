# next-mikro-orm-trpc-template

This template implements minimal architecture on [TypeScript](https://www.typescriptlang.org/) + [Next.js](https://nextjs.org/) + [MikroORM](https://mikro-orm.io/) + [tRPC](https://trpc.io/) + [Tailwind CSS](https://tailwindcss.com/) stack to help you start your next full-stack React application.

## What's included?

* Minimal full-stack application example;
* Bunch of utilities and helpers;
* Tests with AVA, docker-compose and MySQL setup;
* CI config for GitHub Actions.

## Pitfalls

During my attempts to integrate MikroORM with Next.js I had to fall into several issues worth to mention, so here's the list of those:

* MikroORM can't discover entity, when you're trying to use class constructos to instaniate your entities and them persist and flus the data. I'm not sure why is this happening, but to avoid this problem use `EntiyManager` only with entity classes, not with their instances, so that the entity could be discovered (by it's name).

  So, do this:

  ```ts
  const note = orm.em.create(Note, data) // Discovers `Note` entity by `Note.name` and then creates an instance of this entity class filled with given `data`

  await orm.em.persistAndFlush(note)
  ```

  Instead of this:

  ```ts
  const note = new Note(data)

  await orm.em.persistAndFlush(note) // Fails on the 2nd attempt to use it with the `Note` instance.
  ```

* During the development, if you'd have to implement a page with dynamic route params, you'll might get MikroORM re-instaniated multiple times (each time you navigate to that page), if you use it in `getStaticPaths` to fetch the data. To avoid this, you can use `lib/util/patchStaticPaths.ts` helper. It simply returns empty paths in `development` env. Here's the example:

  ```ts
  import {patchStaticPaths} from "lib/util/patchStaticPaths"

  import {getORM} from "server/lib/db/orm"

  // This function will be returned only in production.
  export const getStaticPaths = patchStaticPaths(async () => {
    const orm = await getORM()

    const notes = await orm.em.find(
      Note,

      {},

      {
        disableIdentityMap: true,
        fields: ["id"],
        limit: 1000,
        orderBy: {
          createdAt: "desc"
        }
      }
    )

    return {
      fallback: "blocking",
      paths: notes.map(({id}) => ({params: {id}}))
    }
  })
  ```

* MikroORM can't discover native TypeScipt enums if you were to define those in a separate file. To fix avoid this problem, you'll have to extract emun values manually (but remember about TS enum [quirks](https://youtu.be/jjMbPt_H3RQ)) and put those to `items` option of the `Enum` decorator, along with the `type` options set to needed column type.
