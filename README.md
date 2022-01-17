amari.mecheri@gmail.com
https://github.com/Amari-Mecheri
# A version of the Snake Game using React and TypeScript

## Architecture of ReactSnake:
- This version is a port of GoSnake to React + TypeScript
- this project was bootstrapped with `npx create-react-app reactsnake --template typescript`

### The model: from GO to TypeScript
- TypeScript was used since it allows type checking and intelliSense
- `src/gamelogic` contains the .ts files that are adaptation from the corresponding go version
- Except from synthax, `another difference` is in the way JS and Go handle storage of objects into slices/arrays.
    * JS stores references to each object, hence aSnake.body[0] returns a reference to an object of type Position.
    <br>    var pos= aSnake.body[0]; pos.X = 32 => is the same as aSnake.body[0].X=32
    <br><br>
    * Go stores values,  hence aSnake.body[0] returns a value of type Position
    <br>    pos := aSnake.body[0]; pos.X = 32 => is different to aSnake.body[0].X=32
    <br><br>
- Since there was no "defer way" in JS, `a proper exceptions and errors handling is still to be implemented` (probably by replacing the defers with a try catch)
    <br>
    <br>

### The views: The game rendering
- Each go views was converted to a react component
    * Although it is a simple game, `reredering and performance issues` are immediatly visible.
    <br>=> The use of `react.memo` helped improve performance
    <br><br>
    * In order to keep things simple, the gameBoard is a grid of divs (spots) of 10px*10px. Each spot has an id containing its position.
    <br>=> the candy and snake are represented by `changing the background color` of the corresponding spot.
    <br><br>
    * Access to the spots is done directly via `document.getElementById(id)`
    <br>=> This choice was made to avoid dealing with rerendering issues.

### The controller
- `SnakeGame.tsx` is the game controller.
    * As designed, the controller controls aGameState object and update the views (components) state accordingly
    * Since setPixel accesses the dom directly, `the board has to be rendered before` calling displayObjects to draw the candy and the snake
    <br><br>
- In react, `UseEffect` makes dealing with side effects very easy
    * the main UseEffect callback function executes when there is a change to boardSize
    * and `after the boardView is rerender`. This allows to (re) initGame (to update the gameState and to displayObjects ) and to addEventListener.
<br><br>
### Side notes: When using a library/framework performance can quickly become an issue if proper attention is not given to the rendering process. Even CSS can have a negative impact on performance. During development, I used a cpu widget to check CPU usage, and also measured some delays but the plan is to use tools like those suggested by react: reportWebVitals.
<br><br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` (to be implemented)

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
