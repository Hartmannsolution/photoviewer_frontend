# Demo code to show case many different (bootstrap mostly) controls and techniques

## TODO
1. Form to create tags and edit description
3. Show error when login fails and logout.
4. Backend: backup table for old image descriptions with login info



## Create-react-app
1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
2. This project uses bootstrap for styling: `npm install react-bootstrap@next bootstrap@5.1.1`;
3. This project is deployed to nginx on digital ocean: [See mini guide here](https://github.com/HartmannDemoCode/pages/blob/master/react/deploy_react_router.md)
4. After `npm start` Go to the Home tab for introduction to the different demos in this application demo.
5. Live version at: https://edu.bugelhartmann.dk/react2021fall/controls/
6. Changes to this repo: `gitp "update"` and `npm run deploy` will update the github repo and publish the changes to the live version.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run deploy`
This will execute the `./script.sh` file which both build the application and copies it to the server location. See more at [github](https://github.com/HartmannDemoCode/pages/blob/master/react/deploy_react_router.md)

### `npm run postbackend`
This will run the backend server locally. Data from this can be used in the pagination demo (with small changes in commented code in PaginationDemo.js).


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# repo auto created
