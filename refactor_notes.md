
#Ben's "Refactor to testability" cheat-sheet

1. identify endpoint to test & extract controller function into appropriate controller object (create controller if necessary).
2. import controller into app.js (if necessary)
3. identify dependencies in extracted function and place in module.exports header
4. create new controller in app.js, passing in necessary dependencies - make sure endpoint still works as expected
5. extract queries from controller method into data object (repeating dependency extraction)
6. create new data object in app.js if necessary
7. pass data object into controller in app.js
8. Make sure app is working as expected
9. Congratulations! time to start writing some tests!

# Testing your endpoint
1. Write a simple failing test to make sure your new test suite is being run
2. Replace the failing test with a simple test that proves you are loading in your controller
3. Write a "simple" happy path integration test
  - create mock objects in order to control the data and rendering
  - assert the output is as expected
