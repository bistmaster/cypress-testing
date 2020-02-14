# EMPOWER-Automation

End-to-end automation testing for the EMPOWER-Admin. Supports Chrome, Firefox, and Microsoft Edge.

#### Technology Stacks

- cypress.io
- node.js

#### Running the Test

1. Run the `npm install`
2. Execute the `npm run test`. It will open a Cypress application and you can select to run a single spec or run all test specs.
3. Optionally, you can run directly without opening browser. Using this command `npx cypress run --browser firefox`. You can change the browser to `chrome or edge`
4. Once the test completes it will generate a media file in the root folder. `screenshots` and `videos`.
