package umm3601.deck;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class DeckControllerSpec {
    private DeckController deckController;
    private ObjectId testDeckId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> deckDocuments = db.getCollection("decks");
        deckDocuments.drop();
        List<Document> testDecks = new ArrayList<>();
        testDecks.add(Document.parse("{\n" +
            "   name: \"Deck1\", \n" +
            "   cards: \"[" +
            "{\n" +
            "   word: \"Cool\", \n" +
            "   synonym: \"rad\", \n" +
            "   antonym: \"bogus\", \n" +
            "   general_sense: \"to be radical or something\", \n" +
            "   example: \"Todd is as cool as ice\", \n" +
            "   }, \n" +
            "{\n" +
            "   word: \"Warm\", \n" +
            "   synonym: \"hot\", \n" +
            "   antonym: \"cold\", \n" +
            "   general_sense: \"to feel heat or something\", \n" +
            "   example: \"Todd is warm as hell\", \n" +
            "   } \n" +
            "              ]\n" +
            "                           }"
        ));

        testDecks.add(Document.parse("{\n" +
            "   name: \"Deck2\", \n" +
            "   cards: \"[" +
            "{\n" +
            "   word: \"Rad\", \n" +
            "   synonym: \"cool\", \n" +
            "   antonym: \"bogus\", \n" +
            "   general_sense: \"to be cool or something\", \n" +
            "   example: \"Todd is totally rad\", \n" +
            "   }, \n" +
            "{\n" +
            "   word: \"Hot\", \n" +
            "   synonym: \"warm\", \n" +
            "   antonym: \"cold\", \n" +
            "   general_sense: \"to feel warm or something\", \n" +
            "   example: \"Todd is hot as hell\", \n" +
            "   } \n" +
            "              ]\n" +
            "                           }"
        ));

        testDeckId = new ObjectId();
        Object[] cards = new Object[2];
        BasicDBObject testDeck = new BasicDBObject("_id", testDeckId);
        Object card1 = deckController.addNewCard("swell", "pretty alright", "uncool","this is pretty cool, my dude", "Angular 4 is pretty swell");
        Object card2 = deckController.addNewCard("swell", "pretty alright", "uncool","this is pretty cool, my dude", "Angular 4 is pretty swell");
        cards[0] = card1;
        cards[1] = card2;
        testDeck = testDeck.append("name", "TesterDeck")
                            .append("cards", cards);
    }


}
