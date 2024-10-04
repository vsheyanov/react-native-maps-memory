

# Memory problem
An attempt to reproduce memory leak when rendering maps in a complex app.

# Installation steps
Rename `.env.example` to `.env` and put your own GoogleMaps key. Refer to https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md#installation.

# Testing potential memory leak
1. Pick a variant to render (a map ot 1000 images) when you pick an item. To do that open `App.tsx` and change the line with `const renderMap = true;`
2. Run the app from Android studio and start a profiler
