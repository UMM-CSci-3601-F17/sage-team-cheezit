package umm3601.user;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

import java.util.*;

import static com.mongodb.client.model.Filters.ne;
import static umm3601.Util.*;
import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about users.
 */
public class UserController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> userCollection;

    /**
     * Construct a controller for users.
     *
     * This loads the "database" of user info from a JSON file and
     * stores that internally so that (subsets of) users can be returned
     * in response to requests.
     *
     * @param database the database containing user data
     */
    public UserController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        userCollection = database.getCollection("users");
    }

    /**
     * Get the single user specified by the `id` parameter in the request.
     *
     * @param req the HTTP request
     * @param res the HTTP response
     * @return a success JSON object if the user with that ID is found, a fail
     * JSON object if no user with that ID is found
     */
    public JsonElement getUser(Request req, Response res) {
        res.type("application/json");
        String id = req.params("id");

        FindIterable<Document> jsonUsers
            = userCollection
            .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonUsers.iterator();
        Document user = iterator.next();

        if (user != null) {

            //return buildSuccessJsonResponse("user", gson.toJsonTree(user));
            return gson.toJsonTree(user);
        } else {
            String message = "User with Object ID { oid:" + id + " } wasn't found.";
            return buildFailJsonResponse("id", message);
        }
    }

    /**
     * Get a JSON response with a list of all the users in the "database".
     *
     * @param req the HTTP request
     * @param res the HTTP response
     * @return a success JSON object containing all the users
     */
    public JsonElement getUsers(Request req, Response res) {
        res.type("application/json");

        Map<String, String[]> queryParams = req.queryMap().toMap();
        Document filterDoc = new Document();

        if (queryParams.containsKey("age")) {
            int targetAge = Integer.parseInt(queryParams.get("age")[0]);
            filterDoc = filterDoc.append("age", targetAge);
        }

        //FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingUsers = userCollection.find(filterDoc);
        Iterator<Document> iterator = matchingUsers.iterator();
        List<User> users = new ArrayList<User>();
        while(iterator.hasNext())
        {
            Document next = iterator.next();
            users.add(gson.fromJson(next.toJson(), User.class));
        }

        //BE WARY toJsonTree accepts any Object but it really doesn't.
        //There are multiple ways to call toJsonTree view them at:
        //https://google.github.io/gson/apidocs/com/google/gson/Gson.html#toJsonTree-java.lang.Object-
        return gson.toJsonTree(users, new TypeToken<Collection<User>>(){}.getType());
    }

}
