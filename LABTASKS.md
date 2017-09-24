# Lab Tasks

- Questions that you need to answer (as a group!) are indicated with question
mark symbols (:question:).
- Tasks that specify work to do without a written response will be bulleted.

Responses to questions should be submitted as specified by your instructor.

If you're ever confused about what you need to do for a given task, ask.

<!-- TOC depthFrom:1 depthTo:8 withLinks:1 updateOnSave:1 orderedList:0 -->
## Table of Contents

- [Exploring the Project](#exploring-the-project)
  - [Exploring the server](#exploring-the-server)
- [More Todos!](#more-todos)
  - [Summary Information About ToDos](#summary-information-about-todos)
  - [Make it pretty](#make-it-pretty)
- [Remember to test!](#remember-to-test)
  - [Client-side testing](#client-side-testing)
  - [Server-side testing](#server-side-testing)
- [Questions](#questions)

<!-- /TOC -->
## Exploring the project

The structure of this project should be nearly identical to that of lab #3, and as such there really isn't much excitement in that department.

Answer question 1 in [QUESTIONS](#questions).

### Exploring the server

The server is, for the most part, the same as it has been in the past two labs. The difference to look for here is in how the server gets the data it sends out in reply to requests.

Answer question 2 in [QUESTIONS](#questions).

## More Todos!
- Re-implement the ToDo API, this time pulling data from MongoDB rather than from a flat JSON file.
- When displaying the ToDos in your Angular front-end, make thoughtful decisions about whether work like filtering should be done in Angular or via database queries. It would be reasonable, for example, to have the database filter out all the ToDos belonging to a single user, but let Angular filter by category or status.

### Summary Information About ToDos

To see an example of using the database and the server to do some useful work
(instead of having everything happen in Angular), implement an API endpoint
`/api/todoSummary` which provides summary information about a group of
ToDos in the following format:

````
{
  percentToDosComplete: Float,
  categoriesPercentComplete: {
    groceries: Float,
    ...
  }
  ownersPercentComplete: {
    Blanche: Float,
    ...
  }
}
````

So you should add a new endpoint to your Spark routes, and then have that call
some method (possibly in a new class?) that queries the DB for the relevant data
and assembles this JSON response. Note that you can use
[MongoDB aggregation](http://mongodb.github.io/mongo-java-driver/3.4/driver/tutorials/aggregation/)
to do most of this calculation without having to actually download all the todos,
organize, and count them yourself.

### Make it pretty

- Use the front-end tools you've learned about to build a nice interface for
accessing these APIs:
  - You must use [Glyphicons][glyphicons] somewhere
  - You must use at least two of the following nifty Bootstrap features:
    - [Navs](http://getbootstrap.com/components/#nav)
    - [Pagination](http://getbootstrap.com/components/#pagination)
    - [Progress Bars](http://getbootstrap.com/components/#progress)
    - [Badges](http://getbootstrap.com/components/#badges) or [Labels](http://getbootstrap.com/components/#labels)
    - [ngStyle directive](https://docs.angularjs.org/api/ng/directive/ngStyle)

[glyphicons]: https://getbootstrap.com/components/#glyphicons

TODO: say something about about adding functionality to add TODOs

## Remember to test!

Test test and more test! Your project again should have tests. You should contiue expanding  upon your previous end-to-end test as well as implement Unit Test for both your client-side **and**
the server-side.

### Client-side testing
- The gradle task [_runClientTestsWithCoverage_](#readme) will be extremely useful to see how covered your client-side is by test.

- Continue expanding upon your `TESTCOVERAGE.md` file with any additional end-to-end test added.


### Server-side testing
- Remember to add JUnit Test as you re-implement your ToDo API.

>:exclamation:Pro-Tip: Test Coverage can be produced on IntelliJ as well! Go to to your server test folder and Right-click on the _test_ folder and select **Run 'All Test' with Coverage** which will then provide a report of coverage in your server code in the side bar.

>Additionally you can Right-click, select _Analyze_ -> _Generate Coverage Report..._ which will prompt you for an output directory and give you the option to view the report an HTML report in a browser.  


## Questions

1. :question: Name one element inside a file that has changed? What is being done?
1. :question:  So how does the server get all that data it's sending out?
Why might we have more than one, and how do they interact?

TODO: add more questions

[readme]:https://github.com/UMM-CSci-3601/3601-lab4_mongo_db/#testing-and-continuous-integration
