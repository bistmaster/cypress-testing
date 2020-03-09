# EMPOWER-Automation

End-to-end automation testing for the EMPOWER-Admin. Supports Chrome, Firefox, and Microsoft Edge.

#### Technology Stacks

- cypress.io
- node.js
- fakerjs (Used to fill-up some fake data in the fields)

#### Running the Test

1. Run the `npm install`
2. Execute the `npm run test`. It will open a Cypress application and you can select to run a single spec or run all test specs.
3. Optionally, you can run directly without opening browser. Using this command `npx cypress run --browser firefox`. You can change the browser to `chrome or edge`
4. Once the test completes it will generate a media file in the root folder. `screenshots` and `videos`.

#### Running Test in different environment

##### Dev

`npm run cy:run:chrome:dev`

##### QA

`npm run cy:run:chrome:qa`

##### prod

`npm run cy:run:chrome:prod`

#### Test Data and Configuration files

Configuration files are based on environment. You can find it on `config/[env].cypress.json`

###### Users

1. Series Admin users can be set in `series_admin_user` property in the configuration file.
2. Team Captain users can be set in `captain_user` property in the configuration file.

###### Participants

In creating participant, you can set the test data under `participantInfo` property of the configuration file. These data will be used in filling textfields needed.

###### Company Creation

In creating Company, you can set the test data under `companyInfo` property of the configuration file. These data will be used in filling textfields needed.

###### Company Edit

In editing Company, you can set the test data under `companyInfoEdit` property of the configuration file. These data will be used in order to run the edit functionality

###### Hospitality Add/Edit

For Hospitality, you can set the test data under `hospitality` property of the configuration file.

###### Hospitality Sorting

For Hospitality soring, you can set the test data under `sorting` property of the configuration file.

###### Edit Add/Edit

For Event, you can set the test data under `event` property of the configuration file.
