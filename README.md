# GUESTLINE TASK

This is a recruitment task for Guestline. You can find deployed version [here](https://dazzling-bubblegum-6e8a5c.netlify.app/).

## Setup

This app uses [`vite`](https://vitejs.dev/) for compilation and bundling

1. Install the dependencies

```bash
yarn
```

2. Run the development server:

```bash
yarn dev
```

3. Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) with your browser to see the working app.

## Testing

We're using `vitest` in this app, as it's works well together with vite

```bash
yarn test
```

## General idea

The purpose of the app is to display the list of hotels from the given API with appropriate rooms. An app should have the ability to filter the hotels and rooms by the star rating and number of visitors.

### Fetching

To fetch the hotel data with room data, the app has to perform one request to download the basic hotel data and for each hotel perform a request for the hotel details, namely the hotels' rooms. All the fetching logic can be found in `src/services` folder, which exports the main `getHotels` function.

### Filtering

To filter the data dynamically, we operate on multiple arrays: `allHotels`, `hotelsFilteredByStars`, `hotelsFilteredByRooms`, and `filteredHotels`.

On the initial load:

1. All the hotels are fetched with `getHotels` service and set to `allHotels` state variable.

2. The result is filtered by star rating and set to `hotelsFilteredByStars` state variable. It's useful to filter hotels by star rating first, as it's done in `O(n)` time (where `n` is the number of hotels) and by room occupancy is done in `O(n' * m)` time (where `n'` is the number of hotels and `m` is the number of rooms for a hotel), so in the next, more complex step, there will be fewer hotels to begin with.

3. The result of the above is filtered by room occupancy and set to `filteredHotels` state variable, which is returned from the hook and passed to components to render. At this point, we're not blocking rendering anymore.

4. After that `allHotels` are filtered by room occupancy and set to `hotelsFilteredByRooms` state variable under the hood.

On the number of visitors (room occupancy) change:

1. `hotelsFilteredByStars` are filtered by room occupancy and set to `filteredHotels` -> components are updated.
2. As the number of visitors changes, `allHotels` are filtered by room occupancy and set to `hotelsFilteredByRooms`.

On the star rating changes:

1. `hotelsFilteredByRooms` are filtered by star rating and set to `filteredHotels` -> components are updated.
   As the star rating change, `allHotels` are filtered by star rating and set to `hotelsFilteredByStars`.

In this implementation, with every number of visitors or star rating value change, we avoid double filtering and perform only one filtering, by stars or visitors.

### Styling

CSS modules are used in this app, natively supported by Vite.
