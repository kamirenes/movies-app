# The challenge

This is a technical test app for this challenge you will need to fix the following issues:
The movies-app it the react front end application
The api folder contains a small express api

1. Several images from the app are not loading properly
2. Fix the TODO list in order for the react application
3. Add the required unit testing for your fixes
4. Move to the backend challenge and complete the TODO list
5. Add to the front end a new feature to sell movies to another studio
6. Add a log (plain text file) with the issues that you faced during the test and how you solved them
7. (Optional) fix any vulnerabilities you find

## How you will do it?
1. You need to fork the repo.
2. You need to complete all the items listed before and push the changes to a new branch. That branch must be named ``[NameSurname]`` 
3. Create a PR from your forked branch against this master.


## Solution - Important Read this before test the application!!!!!! 
1. I added .env files on the BE and on the Frontend, usually these kind of files have to be on the .gitignore file, but like this is a test and to make easy the life of the person how check this test, I left those like a public files.
2. To log-in in the platform are necessary the email: admin@example.com and password: 123456
3. To navigate to sell movie section, and in that way to can use the functionality "sell movie to another studio" is necessary make log-in before, I thought the this kind of functionalities is better if are protected for a user token.
4. To run the project without any issues is necessary run it using node version 18