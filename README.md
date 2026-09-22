# E-commerce Playwright Tests

End-to-end test suite for [Automation Exercise](https://automationexercise.com), an e-commerce demo site. The suite covers authentication, products, cart and checkout flows, forms, and basic UI behaviour.

## Tech stack

- [Playwright Test](https://playwright.dev/)
- JavaScript (Node.js)
- GitHub Actions for continuous integration

## Prerequisites

- Node.js LTS and npm
- Internet access to reach `automationexercise.com`

## Install

```bash
npm ci
npx playwright install
```

For a Linux CI environment, install the system dependencies too:

```bash
npx playwright install --with-deps
```

## Run tests

Run the full suite:

```bash
npx playwright test
```

Run one spec file:

```bash
npx playwright test tests/cart/add_to_cart.spec.js
```

Run in headed mode while debugging:

```bash
npx playwright test --headed
```

Use Playwright's interactive debugger:

```bash
npx playwright test --debug
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Browser configuration

The checked-in configuration runs the suite in Chromium. Firefox and WebKit project definitions are included in `playwright.config.js` but are currently commented out. Enable them there when cross-browser coverage is required.

## Test coverage

| Area | Examples |
| --- | --- |
| Authentication | Register, log in, log out |
| Products | Browse products, search, submit product reviews |
| Cart and checkout | Add and remove items, address and invoice flows, registration and login checkout |
| Other UI flows | Contact form, subscription, scrolling, test-cases page |

## Project structure

```text
.github/workflows/playwright.yml  # GitHub Actions workflow
tests/
  auth/                           # Registration, login, logout
  cart/                           # Cart and checkout scenarios
  misc/                           # Contact, subscription, and other flows
  product/                        # Product browsing, search, reviews
  ui/                             # UI behaviour checks
utils/
  test-data.js                    # Test-user factory and auth helpers
tests/fixtures/
  auth.js                          # Isolated registered-user fixture
playwright.config.js              # Playwright configuration
```

## Test data and side effects

Tests that need an account use an isolated Playwright fixture. It creates a unique disposable account for each test and deletes it during teardown, so tests do not depend on run order or shared credentials. Never commit real credentials; `.env` files and the legacy `utils/user.json` path are ignored by Git.

## Continuous integration

GitHub Actions runs the suite on pushes and pull requests targeting `main` or `master`. The workflow installs dependencies with `npm ci`, installs Playwright browsers, runs the tests, and uploads `playwright-report` as an artifact.

## Contributing

Keep tests independent and deterministic. Use stable locators, make assertions explicit, and run the relevant spec locally before opening a pull request.
