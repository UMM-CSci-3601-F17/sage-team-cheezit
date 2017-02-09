# CSCI 3601 Lab #3 - Angular and Spark Lab
[![Build Status](https://travis-ci.org/UMM-CSci-3601/3601-lab3_angular-spark.svg?branch=master)](https://travis-ci.org/UMM-CSci-3601/3601-lab3_angular-spark)

During this lab, you will expand on the ToDo API you created in the previous lab
by building a basic client-side application using AngularJS
(Angular 2, specifically) which will enable you to better handle user input,
display data returned from the server, and all manner of other insane things.

Some significant changes to the structure of the project come about in this lab,
so be on the lookout for those. As always, you'll be expected to make good
use of the version control and project management tools available to you:
write good commit messages, test things, document issues, etc.

Your specific tasks for this lab can be found in the [LABTASKS.md][labtasks]
file in this repository.

## Setup

As in the previous lab, you'll be using IntelliJ. Once you've all joined your
group using GitHub classroom, you can clone your repository using IntelliJ:

- When prompted to create a new IntelliJ project, select **yes**.
- Select **import project from existing model** and select **Gradle.**
  - Make sure **Use default Gradle wrapper** is selected.
- Click **Finish.**

## Running your project

Now that the structure of the project is different, the way we run the project
is different too.

- The familiar **run** Gradle task will still run your SparkJava server.
(which is available at ``localhost:4567``)
- The **build** task will still _build_ the entire project (but not run it)

The major difference here is that the _client_ side of your project is,
effectively, an entirely separate project from your SparkJava server.

In order to serve up the _client side_ of your project, you'll need to use the
**buildClient** Gradle task. This will trigger the various tools in the
client side portion of the project to build and host your client side
application on their own little web-server, available by default at ``localhost:9000``.

## Testing and Continuous Integration

This things are mostly the same as they were in Lab #2

:interrobang: TODO: Write this section

## Resources

- [What _is_ webpack...?][whats-webpack]
- [Testing Angular 2 with Karma/Jasmine][angular2-karma-jasmine]


[labtasks]: LABTASKS.md
[whats-webpack]: https://webpack.github.io/docs/what-is-webpack.html
[angular2-karma-jasmine]: http://twofuckingdevelopers.com/2016/01/testing-angular-2-with-karma-and-jasmine/
