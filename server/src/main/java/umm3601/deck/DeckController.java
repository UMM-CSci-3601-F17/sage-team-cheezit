package umm3601.deck;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;




public class DeckController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> deckCollection;


    public DeckController(MongoDatabase database){
        gson = new Gson();
        this.database = database;
        deckCollection = database.getCollection("decks");
    }

    public String getDeck(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String deck;
        try {
            deck = getDeck(id);
        }
        catch (IllegalArgumentException e){
            res.status(400);
            res.body("The requested user id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }

        if(deck != null){
            return deck;
        }
        else {
            res.status(404);
            res.body("The requested deck with id " + id + " was not found");
        }
        return null;
    }


    public String getDeck(String id){
        AggregateIterable<Document> deck = deckCollection.aggregate(Arrays.asList(
            Aggregates.match(new Document("_id", new ObjectId(id))),
            Aggregates.lookup("cards", "cards", "_id", "cards")
        ));

        return deck.first().toJson();
    }

    public String getDecks(Request req, Response res){
        res.type("application/json");
        return getDecks(req.queryMap().toMap());
    }

    public String getDecks(Map<String, String[]> queryParams){
        Document filterDoc = new Document();
        if (queryParams.containsKey("name")){
            String  targetName = queryParams.get("name")[0];
            filterDoc = filterDoc.append("name", targetName);
        }

        AggregateIterable<Document> decks = deckCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDoc),
            Aggregates.project(Projections.fields(
                Projections.include("name"),
                Projections.computed("count", new Document("$size", "$cards"))
            ))
        ));

        return JSON.serialize(decks);
    }

    public Object addNewDeck(Request req, Response res)
    {

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;
                    String name = dbO.getString("name");


                    Document newDeck = addNewDeck(name);
                    if (newDeck != null) {
                        return newDeck.toJson();
                    } else {
                        res.status(400);
                        res.body("The requested new deck is missing one or more objects");
                        return false;
                    }


                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new deck request failed.");
                    return false;
                }

            }
            else
            {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return false;
            }
        }

        catch(RuntimeException ree)
        {
            ree.printStackTrace();
            return false;
        }

    }

    public Document addNewDeck(String name){
        if (name == null || name.equals("")) {
            return null;
        }
        Document newDeck = new Document();
        ObjectId newID = new ObjectId();
        System.out.println(newID.toString());
        newDeck.append("_id", newID);
        newDeck.append("name", name);
        newDeck.append("cards", Collections.emptyList());
        try{
            deckCollection.insertOne(newDeck);
        }
        catch(MongoException me){
            me.printStackTrace();
            return null;
        }

        return newDeck;
    }

}
