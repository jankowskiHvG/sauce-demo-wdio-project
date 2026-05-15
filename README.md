----------------------------------------------
## EPAM JS AUTOMATION TASK - SAUCE DEMO
----------------------------------------------
## 🎯 Project Scope
This project was developed as part of the **EPAM JS Test Automation Course**. 
The goal was to automate two key user flows (UC) on the SauceDemo website:
- **UC-1 Product Details Verification**: Parametrized test verifying data consistency between the main list and the product details page.
- **UC-2 Footer & Social Links**: Verification of social media links visibility and correctness, including cross-tab navigation.

## Tech Stack

- **Framework**: WebdriverIO (v8+)
- **Test Runner**:Cucumber (BDD Interface)
- **Test Approach**: BDD with Gherkin
- **Assertion Library**: Expect-webdriverio
- **Reporter**: Spec & Allure
- **Pattern**: Page Object Model (POM)
----------------------------------------------
## Prerequisites
----------------------------------------------

1. Environment:

- **Node.js** (developed in v24.14.0)
- **Java** (for Allure reports)
- **Allure**
- **Microsoft Edge**
- **Mozilla Firefox**

Install Allure (dependency is already in package.json file):
```bash
npm -g allure-commandline
```

2. Clone the repository and install dependencies
```bash
npm install
```

3. Environment variables

!! Rename .env-example or create new .env file
Fill the password in .env file

Currently .env-example consists only "sauce_password=YOUR_PASSWORD"

It's not a big secret that it's "secret_sauce", but for educational reasons I left password missing

----------------------------------------------
## Running tests
----------------------------------------------
Run all tests:

```bash
npm run wdio
```

Run chosen test:
```bash
npm run wdio -- --spec src/tests/features/UC-1-ProductDetails.feature
npm run wdio -- --spec src/tests/features/UC-2-Links.feature
```
----------------------------------------------
## Test Report
----------------------------------------------
1. **SPEC REPORTER**
Enabled in console for immediate feedback.


2. **ALLURE REPORT**
**After test (npm run wdio) you can:

**GENERATE an HTML report:
```bash
allure generate
```
[or to generate clean report]
```bash
allure generate allure-results --clean -o allure-report
```

**Open report in browser:
```bash
allure open
```

