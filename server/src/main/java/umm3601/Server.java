package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.utils.IOUtils;
import umm3601.card.CardController;
import umm3601.deck.DeckController;

import java.io.IOException;
import java.io.InputStream;

import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Server {
    private static final String databaseName = "i1-droptable-dev";
    private static final int serverPort = 4567;

    public static void main(String[] args) throws IOException {

        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        CardController cardController = new CardController(database);

        DeckController deckController = new DeckController(database);

        //Configure Spark
        port(serverPort);
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


        // Redirects for the "home" page
        redirect.get("", "/");

        Route clientRoute = (req, res) -> {
            //Return client files
            InputStream stream = Server.class.getResourceAsStream("/public/index.html");
            return IOUtils.toString(stream);
        };

        get("/", clientRoute);

        /// Deck and Card Endpoints ///////////////////////////
        /////////////////////////////////////////////
        get("api/cards/:id", cardController::getCard);
        get("api/cards", cardController::getCards);
        get("api/decks", deckController::getDecks);
        post("api/decks/add", deckController::addNewDeck);
        get("api/decks/:id", deckController::getDeck);
        post("api/cards/add", cardController::addNewCard);


        // Called after each request to insert the GZIP header into the response.
        // This causes the response to be compressed _if_ the client specified
        // in their request that they can accept compressed responses.
        // There's a similar "before" method that can be used to modify requests
        // before they they're processed by things like `get`.
        after("*", Server::addGzipHeader);

        get("/*", clientRoute);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });



    }

    // Enable GZIP for all responses
    private static void addGzipHeader(Request request, Response response) {
        response.header("Content-Encoding", "gzip");
    }
}
