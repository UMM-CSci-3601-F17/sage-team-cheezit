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

:question: What are a couple of these new tools? What do you think they do?

:question: How does the navbar work in this project? Is our SparkJava server
the only thing doing routing?

#### Exploring the server

The server is mostly the same as in lab #2, aside from its move to a new
directory.

### Todo API: Redux

In lab #2, you worked with your partner to implement an API for requesting
'to-dos' from a server. In this lab, you'll be working on implementing a more
useful front-end to make use of this API. Before you can begin work on your
cool client side stuff, you'll need to have a working implementation of the
API from Lab #2.

- Work with your partner to (once again) implement the todo API from lab #2.
You are encouraged to re-use code from Lab #2, and to make decisions about how
to mix-and-match code from your respective versions of Lab #2.

- Your group should keep some record of the discussion here. This can be comments 
on issues, comments in your code, a note in your writeup for this lab, etc.


### Writing a beautiful client side application

Now that we have a reliable way to request todo data from our server,
we should write a nice client-side application to help us request and view
this data.

- Use AngularJS (Specifically, we're using Angular 2) to build a nice
client-side interface which:
    - Allows a the user to easily filter search results by status, author,
      body text, etc.
    - Displays returned todo items in a useful way
    - ???
    - Profit
    
- Your new functionality should be contained in a 'todos' view, with a 'todo-list' component.
    
- You should make some decisions about when to request data from the API,
and when to simply use Angular's awesome filtering tools to change how
the data is displayed. You have to use Angular's filtering at least a little
bit. Make note of why you choose to do things the way you did.


