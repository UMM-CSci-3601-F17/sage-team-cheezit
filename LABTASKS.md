# Lab Tasks

- Questions that you need to answer (as a group!) are indicated with question
mark symbols (:question:).
- Tasks that specify work to do without a written response will be bulleted.

Responses to questions should be submitted as specified by your instructor.

If you're ever confused about what you need to do for a given task, ask.

### Exploring the project

Look over the directory structure of the project before you start making
changes to it. Note that the structure has changed significantly since
the previous lab!

:question: Notice anything new in our ``.gitignore``? There are actually
multiple ``.gitignore`` files in this project, can you find them all?

:question: Note also that there are now multiple ``build.gradle`` files
as well! Why is this?

#### Exploring the client

The client side of our project has moved since lab #2, the testing is
now being handled in a different way, and we've introduced several new tools
to help us with client-side development.

:question: What are a couple of these new tools? Explain what some of these new tools do?

:question: How does the navbar work in this project? Is our SparkJava server
the only thing doing routing?

:question: What does the `user-list.service.ts` do? Why is it not just done in
the `user-list.component.ts`?

#### Exploring the server

The server is mostly the same as in lab #2, aside from its move to a new
directory.

### Todo API: Redux

In lab #2, you worked with your partner to implement an API for requesting
'to-dos' from a server. In this lab, you'll be using a to-do API provided
(as a jar file) with the lab. The API meets the specifications of lab 2 and
can be found at `localhost:4567/api/todos`.

### Writing a beautiful client side application

Now that we have a reliable way to request todo data from our server,
we should write a nice client-side application to help us request and view
this data.

- Use AngularJS (Specifically, we're using Angular 2) to build a nice
client-side interface which:
    - Allows a the user to easily filter search results by status, owner,
      body text, etc.
    - Displays returned todo items in a useful, meaningful way
    - ???
    - Profit

- Your new functionality should be contained in a 'todos' view, with a 'todo-list' component.

- You should make some decisions about when to request data from the API,
and when to simply use Angular's awesome filtering tools to change how
the data is displayed. You have to use Angular's filtering at least once. Make note of why you choose to do things the way you did.

### Remember to test!

- Your project should have tests, specifically client-sided tests, and should have working TravisCI integration.

>Interestingly enough, though, there won't be much _more_ to test in this lab than there
>was in Lab #2 due the the fact that we're not _really_ adding more "business logic",
>we're just changing how we display the JSON we get back from the server.
>
>So: don't freak out over trying to add more tests, just make sure that what little code
>you have is written in a testable way, and has some tests. Try to research testing Angular 2 with
> Angular 2's TestBed. It'll be very useful once we get to creating a project for the customer.
