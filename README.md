# The Cotton Blossoms Boutique Gift Registry

A mobile-friendly starter website for the Albany and Blakely stores.

## Current status

This is a **front-end preview**, not a public registry service yet. The create/search interaction stores sample registry entries in the visitor's own browser only. Visitors on other devices cannot see them, and no orders or payments are processed.

## Preview locally

Open `index.html` in a browser, or publish the static files to a temporary preview host.

## Store details

- Albany: 2700 Dawson Rd, Suite 6, Albany, GA 31707
- Blakely: 178 Court Street, Blakely, GA 39823
- Domain intended for launch: thecottonblossomsboutique.com

## Required before public launch

1. Add a hosted database and server-side access controls so registries can be created, shared, edited by their owners, and searched across devices.
2. Add registry item/catalog management and a reservation/purchased status workflow.
3. Connect Square using a server-side integration. Never put Square access tokens or application secrets in browser JavaScript or this public repository.
4. Confirm how Square catalog items, inventory, pickup locations, taxes, and checkout should work for both stores.
5. Test privacy, duplicate purchases, mobile layout, accessibility, and order/pickup notifications.

## Suggested deployment

The site is static and can be hosted on a free Cloudflare Pages plan. Connect this GitHub repository, use the repository root as the build directory, and leave the build command blank. The custom domain can be attached after the Cloudflare Pages deployment is working.