# sct-test

## Live demo

bvialashoppingcartchallenge.surge.sh

## Technical choices

### Checkout class
Instead of the suggested Checkout class, I chose to follow Vue paradigms and use a Vuex store to manage the state of the shop.  
It provides several advantages:  
* It leverages Vue built-in reactivity system, so we don't have to handle it ourselves
* It cleanly separates business code from presentation code
* It saves us from having complex parent to child and child to parent component communication.

The store itself acts similarly to a Class: it has read-only attributes (state), that can be updated through exposed functions (mutations and actions), and also some getters.

### Scan method
The scan function also works differently from the one suggested.
As the UI allows the user to directly input any quantity, it makes the code more simple that the scan method takes a `quantity` parameter and simply set the quantity state with the passed value, rather than working in an incremental way.
Otherwise we would have had to also code an `unscan` method, and some loop logic so that these methods are called the right number of time when the user uses the quantity input.

### Discounts

Discounts are implemented as Objects containing : 
* `scope`,  an array containing all the product codes the discount applies to.
* `name`, a string which is used to display purpose.
* `getValue`, a function that takes a `quantity` and `price` parameters and computes the value of the discount


It makes it easy to add new kind of discounts, or change the products they apply to.

I also built two factory functions to help create discount functions.

A limitation of this design is that it doesn't support cross product discounts, for example "get 3€ off if you buy a cap and a shirt".

To achieve this, the getValue functions would have to take the whole cart state as parameter, which would make the discount system more complex.

## How it works

* At application startup, the root App component calls a store action to initialize the Shop.  
* The store fetches products and discount from a mocked API call defined in `/api/shop.js`.  
Products and discounts are defined in the `/api/static` folder.
* Available products, their currently selected quantity (by default 0), and the list of discounts are set in the store state.
* The Product component, which contains user controls, can update the state by calling store mutations.
* All the components can use current state and derived values (getters) to display reactive information to the user.

## Improvements

### Reliability & scalability
To improve confidence in the codebase and in making changes, tests could be implemented, for example using `vue-test-utils`.  

### Error handling
The mocked API call always resolves, but an actual http request could fail for many reasons. It should be handled with correct feedback to the user.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
