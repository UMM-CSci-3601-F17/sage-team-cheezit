package umm3601.card;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class CardController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> cardCollection;

    public CardController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        cardCollection = database.getCollection("cards");
    }

    public String getCard(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String deck;
        try {
            deck = getCard(id);
        }
        catch (IllegalArgumentException e){
            res.status(400);
            res.body("The requested card id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }

        if(deck != null){
            return deck;
        }
        else {
            res.status(404);
            res.body("The requested card with id " + id + " was not found");
        }
        return null;
    }

    public String getCard(String id){
        Iterable<Document> jsonCards
            = cardCollection
            .find(eq("_id", new ObjectId(id)));
        Iterator<Document> iterator = jsonCards.iterator();
        if (iterator.hasNext()) {
            Document card = iterator.next();
            return card.toJson();
        } else {
            // We didn't find the desired deck
            return null;
        }
    }

}
