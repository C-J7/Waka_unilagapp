# Waka4Lag

Campus navigation app for the University of Lagos, built to help guests and first-time visitors find their way around.

**Live demo:** https://waka-unilagapp.vercel.app

## What it does

Waka4Lag ("waka" — Nigerian pidgin for "walk"/"go") plots a route between locations on UNILAG's campus on an interactive map, using a custom implementation of Dijkstra's algorithm to compute the shortest path across the campus's road/path network.

## Stack

- React + TypeScript, bundled with Vite
- [Leaflet](https://leafletjs.com/) / react-leaflet for the interactive map
- A hand-rolled [Dijkstra's algorithm](./src/Waka-algo/dijkstra.ts) over campus location data
- React Router for navigation between the map, settings, and about pages

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── App.tsx            # Routes: home (map), settings, about
├── Data/               # Campus location/graph data
├── Waka-algo/
│   └── dijkstra.ts     # Shortest-path implementation
├── components/         # Navbar, sidebar, map components
└── pages/               # HomePage, Settings, About
```
