# Technical Lesson: Testing with Vitest
## Introduction
In this lesson, we will explore how to test different features of our page.

## Unit Testing
- Testing with Vitest
- Testing different features

## Scenario
Imagine you are working for a group messaging application. The key feature that needs to be added is to both display the users in the group chat and to be able to change the online status of the user. The company also wants you to build a test suite for each of these features.

- Build test suite for display functionality
- Build display for users as well as their online status
- Build test suite for change functionality
- Build editing functionality to change the online status of a user

## Tools and Resources
- Testing Library: [https://testing-library.com/](https://testing-library.com/)

## Instructions

### Set Up
Before we begin coding, let's complete the initial setup for this lesson:

#### Fork and Clone
1. Go to the provided GitHub repository link.
2. Fork the repository to your GitHub account.
3. Clone the forked repository to your local machine.

#### Open and Run File
1. Open the project in VSCode.
2. Run `npm install` to install all necessary dependencies.

## Instructions

### Task 1: Define the Problem
The user should be able to:
- See other users
- Change any user's status
- The company wants a testing suite for each of these features

### Task 2: Determine the Design
- Determine if we need to expand the component tree.
- Determine where to implement new hooks, state, or props.

### Task 3: Develop, Test, and Refine the Code

#### Step 1: Create a Feature Branch
```sh
git checkout -b feature-testing
```

#### Step 2: Start the Server
Run json-server to serve our API:
```sh
npm run server
```
This will run the server on `http://localhost:4000`. Open `http://localhost:4000/users` in your browser and review the existing data structure.

Now, start the React app:
```sh
npm run dev
```
Visit `http://localhost:3000`—you should see the application running.
Take a moment to familiarize yourself with the application and components.

#### Step 3: Testing Users Display - Folder Creation
Before the functionality of the code is complete, we want to first build out our test suite.

**Folder Structure:**
```
└── __tests__
    ├── App.test.jsx
    ├── setup.jsx
    └── test_suites
        ├── ChangeStatus.test.jsx
        └── DisplayUsers.test.jsx
```

#### Step 4: Testing Users Display - Setup
Update `setup.jsx`:
```js
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import fetch from 'node-fetch';

global.fetch = fetch;

global.baseUsers = [...];

global.setFetchResponse = (val) => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }));
}

afterEach(() => {
    cleanup();
});
```

Update `app.test.jsx`:
```js
import './test_suites/DisplayUsers.test'
import './test_suites/ChangeStatus.test'
```

#### Step 5: Testing Users Display - Testing
Update `DisplayUsers.test.jsx`:
```js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('Our app will', () => {
  test('displays all users on startup', async () => {
    global.setFetchResponse(global.baseUsers);
    let { findAllByTestId } = render(<App />);
    const userItems = await findAllByTestId('user-item');
    expect(userItems).toHaveLength(global.baseUsers.length);
  });
});
```

#### Step 6: Testing Users Display - Build out functionality
Update `App.jsx`:
```js
import { useState, useEffect } from 'react'
import UserList from './UserList'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:6001/users')
      .then(r => r.json())
      .then(data => setUsers(data))
  }, [])
  return (<div><UserList users={users} /></div>)
}
export default App;
```

Commit changes:
```sh
git commit -am "render items on page load"
```

#### Step 7: Testing Status Editing - Testing
Update `ChangeStatus.test.jsx`:
```js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('Our App will', () => {
    test('edit the status of the user', async () => {
        global.setFetchResponse(global.baseUsers);
        const { findAllByTestId } = render(<App />);
        const statusButtons = await findAllByTestId('status-item');
        global.setFetchResponse({...});
        fireEvent.click(statusButtons[0]);
        expect(fetch).toHaveBeenCalledWith(...);
    });
});
```

#### Step 8: Testing Status Editing - Build out functionality
Update `App.jsx`:
```js
function changeStatus(updatedUser) {
  fetch(`http://localhost:6001/users/${updatedUser.id}`, {...})
    .then(r => r.json())
    .then(data => {...})
}
```
Update `UserList.jsx`:
```js
function UserList({ users, changeStatus }) {
  function onClick(user) {...}
  return (
    <ul>
      {users.map((user) => (
        <div data-testid="user-item" key={user.id}>
          <p data-testid="status-item" onClick={() => onClick(user)}>{user.status}</p>
        </div>
      ))}
    </ul>
  );
}
export default UserList;
```

Commit changes:
```sh
git commit -am "add edit user functionality to the user object"
```

#### Step 9: Push changes to GitHub and Merge Branches
```sh
git push origin feature-testing
git checkout main
git pull origin main
git branch -d feature-testing
```

## Task 4: Document and Maintain
- Add comments to code.
- Update README.
- Remove unnecessary/commented-out code.
- Ensure `vite.config.js` connects with tests.
- Research different testing methods if unsure.

---
This guide ensures proper implementation and testing using Vitest. 🚀

