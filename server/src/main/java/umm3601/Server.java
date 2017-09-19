package umm3601;

import static spark.Spark.*;

import spark.Filter;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import umm3601.todo.ToDoController;
import umm3601.user.Database;
import umm3601.user.UserController;

import java.io.IOException;
import static spark.debug.DebugScreen.*;


public class Server {
    public static final String USER_DATA_FILE = "src/main/data/users.json";
    private static Database userDatabase;

    public static void main(String[] args) throws IOException {
        final Gson gson = new Gson();

        UserController userController = buildUserController();
        ToDoController toDoController = new ToDoController();

        //Configure Spark
        port(4567);
        enableDebugScreen();

        // Specify where assets like images will be "stored"
        staticFiles.location("/public");

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));




        // Simple example route
        get("/hello", (req, res) -> "Hello World");

        // Redirects for the "home" page
        redirect.get("", "/");
        redirect.get("/", "http://localhost:9000");

        /// User Endpoints ///////////////////////////
        /////////////////////////////////////////////

        //List users, filtered using query parameters
        get("api/users", userController::getUsers);

        // See specific user
        get("api/users/:id", userController::getUser);

        /// Todos Endpoints //////////////////////////
        /////////////////////////////////////////////

        // List todos
        get("api/todos", (req, res) -> {
            res.type("application/json");
            return gson.toJson(toDoController.listToDos(req.queryMap().toMap()));
        });

        // See specific todos
        get("api/todos/:id", (req, res) -> {
            res.type("application/json");
            String id = req.params("id");
            return gson.toJson(toDoController.getToDo(id));
        });

        // An example of throwing an unhandled exception so you can see how the
        // Java Spark debugger displays errors like this.
        get("api/error", (req, res) -> {
            throw new RuntimeException("A demonstration error");
        });

        // Called after each request to insert the GZIP header into the response.
        // This causes the response to be compressed _if_ the client specified
        // in their request that they can accept compressed responses.
        // There's a similar "before" method that can be used to modify requests
        // before they they're processed by things like `get`.
        after("*", addGzipHeader);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });

    }

    /***
     * Create a database using the json fie, use it as
     * data source for a new UserController
     *
     * Constructing the controller might throw an IOException if
     * there are problems reading from the JSON "database" file.
     * If that happens we'll print out an error message and shut
     * the server down.
     * @throws IOException if we can't open or read the user data file
     */
    private static UserController buildUserController() {
        UserController userController = null;

        try {
            userDatabase = new Database(USER_DATA_FILE);
            userController = new UserController(userDatabase);
        } catch (IOException e) {
            System.err.println("The server failed to load the user data; shutting down.");
            e.printStackTrace(System.err);

            // Shut the server down
            stop();
            System.exit(1);
        }

        return userController;
    }

    // Enable GZIP for all responses
    private static Filter addGzipHeader = (Request request, Response response) -> {
        response.header("Content-Encoding", "gzip");
    };
}
