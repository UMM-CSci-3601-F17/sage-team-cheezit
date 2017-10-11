package umm3601.card;

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
import umm3601.deck.DeckController;

import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class CardController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> cardCollection;
    private final MongoCollection<Document> deckCollection;

    public CardController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        cardCollection = database.getCollection("cards");
        deckCollection = database.getCollection("decks");
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

    public String getCards(Request req, Response res){
        res.type("application/json");
        return getCards(req.queryMap().toMap());
    }

    public String getCards(Map<String, String[]> queryParams){
        Document filterDoc = new Document();
        if (queryParams.containsKey("word")){
            String  targetWord = queryParams.get("word")[0];
            filterDoc = filterDoc.append("word", targetWord);
        }

        AggregateIterable<Document> cards = cardCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDoc),
            Aggregates.project(Projections.fields(
                Projections.include("word"),
                Projections.include("synonym"),
                Projections.include("antonym"),
                Projections.include("general_sense"),
                Projections.include("example_usage")

            ))
        ));

        return JSON.serialize(cards);
    }

    public boolean addNewCard(Request req, Response res)
    {

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;
                    String deckID = dbO.getString("deckID");
                    String word = dbO.getString("word");
                    String synonym = dbO.getString("synonym");
                    String antonym = dbO.getString("antonym");
                    String general_sense = dbO.getString("general_sense");
                    String example_usage = dbO.getString("example_usage");


                    Document newCard = addNewCard(deckID, word, synonym, antonym, general_sense, example_usage);
                    if (newCard != null) {
                        return true;
                    } else {
                        res.status(400);
                        res.body("The requested new card is missing one or more objects");
                        return false;
                    }


                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new card request failed.");
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

    public Document addNewCard(String deckID, String word, String synonym, String antonym, String general_sense, String example_usage){
        if (deckID == null || word == null || synonym == null || antonym == null || general_sense == null || example_usage == null) {
            return null;
        }
        if (deckID.equals("") || word.equals("") || synonym.equals("") || antonym.equals("") || general_sense.equals("") || example_usage.equals("")) {
            return null;
        }
        Document newCard = new Document();
        ObjectId newID = new ObjectId();
        System.out.println(newID.toString());
        newCard.append("_id", newID);
        newCard.append("word", word);
        newCard.append("synonym", synonym);
        newCard.append("antonym", antonym);
        newCard.append("general_sense", general_sense);
        newCard.append("example_usage", example_usage);
        try{
            cardCollection.insertOne(newCard);
            deckCollection.updateOne(new Document("_id", new ObjectId(deckID)), new Document("$push", new Document("cards", newID)));
        }
        catch(MongoException me){
            me.printStackTrace();
            return null;
        }

        return newCard;
    }

}
