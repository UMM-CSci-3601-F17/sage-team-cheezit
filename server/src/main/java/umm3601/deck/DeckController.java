package umm3601.deck;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
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
import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;



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
        Iterable<Document> jsonDecks
            = deckCollection
            .find(eq("_id", new ObjectId(id)));
        Iterator<Document> iterator = jsonDecks.iterator();
        if (iterator.hasNext()) {
            Document deck = iterator.next();
            return deck.toJson();
        } else {
            // We didn't find the desired deck
            return null;
        }
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
        FindIterable<Document> matchingDecks = deckCollection.find(filterDoc);
        return JSON.serialize(matchingDecks);
    }


    public String getDeckNames(Request req, Response res){
        Iterable<Document> jsonDecks = deckCollection.aggregate(
            Arrays.asList(
                Aggregates.project(
                    Projections.fields(
                       Projections.excludeId(),
                       Projections.include("name")
                    )
                )
            )
        );
        return JSON.serialize(jsonDecks);
    }

    public boolean addNewDeck(Request req, Response res)
    {

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;

                    String name = dbO.getString("name");


                    Object[] cards = new Object[20];



                    return addNewDeck(name, cards);
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



    /**
     *
     * @param name
     * @param cards

     * @return
     */
    public boolean addNewDeck(String name, Object[] cards) {

        Document newDeck = new Document();
        newDeck.append("name", name);
        newDeck.append("cards", cards);



        try {
            deckCollection.insertOne(newDeck);
        }
        catch(MongoException me)
        {
            me.printStackTrace();
            return false;
        }

        return true;
    }

    /**
     *
     * @param word
     * @param synonym
     * @param antonym
     * @param general_sense
     * @param example_usage
     * @return
     */
    public Document addNewCard(String word, String synonym, String antonym, String general_sense, String example_usage) {

        Document newCard = new Document();
        newCard.append("word", word);
        newCard.append("synonym", synonym);
        newCard.append("antonym", antonym);
        newCard.append("general_sense", general_sense);
        newCard.append("example_usage", example_usage);



        return newCard;
    }


}
