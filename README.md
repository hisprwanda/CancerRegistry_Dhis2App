# Cancer-Registry App

![Cancer Registry Logo](https://github.com/hisprwanda/CancerRegistry_Dhis2App/blob/main/public/CancerRegistryApp_logo.png)

## 1. Introduction

This is a DHIS2 Web application that was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).
The goal of this project was to create a web application that will help data managers at any District Hospital in Rwanda to retrieve data related to their cancer patients and format, filter and put the data in a Tab-Separated file that will later be imported in CanReg5.

### 1.1 What is CanReg5?

"CanReg5 is an open source tool to input, store, check and analyse cancer registry data.

It has modules to do data entry, quality control, consistency checks and basic analysis of the data. The main improvements from the previous version are the new database engine, the improved multi user capacities and that the development is managed as an open source project.

Also included is a tool to facilitate the set up of a new or modification of an existing database by adding new variables, tailoring the data entry forms etc." _[International Association for Cancer Registries](http://www.iacr.com.fr/index.php?option=com_content&view=article&id=9:canreg5&catid=68&Itemid=445)_

### 1.2. App Users

Because CanReg5 is not accessible to the internet. The App will be used by the people at the national level where the man Cancer Registry database and the production CanReg5 application are hosted.

## 2. Development Team

The application has been developed by [HISP Rwanda](hisprwanda.org) with guidance from [DHIS2](dhis2.org)'s core development team.

## 3. Running the Application

This application can be installed in any **DHIS2** instance which has oncology program.

For debugging below are the scripts you can use to run the app in your local environment.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

### `yarn deploy`

Deploys the built app in the `build` folder to a running DHIS2 instance.<br />
This command will prompt you to enter a server URL as well as the username and password of a DHIS2 user with the App Management authority.<br/>
You must run `yarn build` before running `yarn deploy`.<br />

See the section about [deploying](https://platform.dhis2.nu/#/scripts/deploy) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).

## 4. Points of Contacts

| Names                |       Title        |                       Email |                       Github |
| -------------------- | :----------------: | --------------------------: | --------------------------: |
| Maurice Jules Mulisa | Software Developer |     mauricej@hisprwanda.org |     [mauricejulesm](https://github.com/mauricejulesm) |
| Pascal Ndayizigiye   | Software Developer | pndayizigiye@hisprwanda.org | pndayizigiye |
