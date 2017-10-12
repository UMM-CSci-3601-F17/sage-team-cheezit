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
import umm3601.card.CardController;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class DeckControllerSpec {
    private DeckController deckController;
    private CardController cardController;
    private ObjectId testDeckId;

    private List<Document> testCards;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("i1-droptable-test");
        MongoCollection<Document> deckDocuments = db.getCollection("decks");
        MongoCollection<Document> cardDocuments = db.getCollection("cards");
        deckDocuments.drop();
        cardDocuments.drop();
        List<Document> testDecks = new ArrayList<>();
        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 1\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b6\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b7\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b8\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b9\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9ba\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bb\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bc\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bd\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9be\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bf\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac25d47c9429bff9ba909\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9c0\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 2\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDeckId = new ObjectId();
        ObjectId[] cards = {new ObjectId("59dac7b147c9429bff9ba9b3"),
            new ObjectId("59dac7b147c9429bff9ba9b4"),
            new ObjectId("59dac7b147c9429bff9ba9b5")};
        BasicDBObject testDeck = new BasicDBObject("_id", testDeckId)
            .append("name", "test deck 3")
            .append("cards", cards);

        deckDocuments.insertMany(testDecks);
        deckDocuments.insertOne(Document.parse(testDeck.toJson()));

        testCards = new ArrayList<>();
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "        },\n" +
            "        \"word\": \"Aesthetic reading\",\n" +
            "        \"synonym\": \"artistic\",\n" +
            "        \"antonym\": \"Efferant Reading\",\n" +
            "        \"general_sense\": \"a term to describe reading for pleasure\",\n" +
            "        \"example_usage\": \"A readers response that is driven by personal feelings from the transactionbetween the reader with text Louise Rosenblatt 1978 term\"\n" +
            "    }"));

        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "        },\n" +
            "        \"word\": \"Alliteration\",\n" +
            "        \"synonym\": \"allegory\",\n" +
            "        \"antonym\": \"free verse poetry\",\n" +
            "        \"general_sense\": \"repetition of the initial sound (s) or letters in a group of words.\",\n" +
            "        \"example_usage\": \"Often found in prose or poetry: Craig loved his fuzzy furry ferret.\"\n" +
            "    }"));

        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "        },\n" +
            "        \"word\": \"Plethora\",\n" +
            "        \"synonym\": \"Excess, plenty\",\n" +
            "        \"antonym\": \"Lack, scarcity, few\",\n" +
            "        \"general_sense\": \"overabundance\",\n" +
            "        \"example_usage\": \"There was a plethora of rubber duckies in the pool.\"\n" +
            "    }"));

        cardDocuments.insertMany(testCards);
        cardController = new CardController(db);
        deckController = new DeckController(db);
    }

    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    public List<String> getStringsFromBsonArray(BsonArray docs, String field) {
            return docs.stream()
                .map(x -> x.asDocument().getString(field).getValue())
                .sorted()
                .collect(Collectors.toList());
    }

    @Test
    public void getAllDecks() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = deckController.getDecks(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 decks", 3, docs.size());
        List<String> names = getStringsFromBsonArray(docs, "name");
        List<String> expectedNames = Arrays.asList("test deck 1", "test deck 2", "test deck 3");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getDecksbyName() {
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("name", new String[] { "test deck 1" });
        String jsonResult = deckController.getDecks(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 1 deck", 1, docs.size());
        assertEquals("Name should match", "test deck 1", docs.get(0).asDocument().getString("name").getValue());
    }

    @Test
    public void getTestDeckById() {
        String jsonResult = deckController.getDeck(testDeckId.toHexString());
        Document testDeck = Document.parse(jsonResult);
        assertEquals("Name should match", "test deck 3", testDeck.get("name"));
    }

    @Test
    public void getTestDeckCards() {
        String jsonResult = deckController.getDeck(testDeckId.toHexString());
        Document testDeck = Document.parse(jsonResult);
        ArrayList<Document> cards = testDeck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards", 3, cards.size());
        assertEquals("words should match", Arrays.asList("Aesthetic reading", "Alliteration", "Plethora"),cards.stream().map(x -> x.getString("word")).collect(Collectors.toList()));
        assertEquals("Cards should match", testCards, cards);
    }

    @Test
    public void addOneDeck() {
        Document addResult = deckController.addNewDeck("test deck 4");
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = deckController.getDecks(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 decks", 4, docs.size());
        List<String> names = getStringsFromBsonArray(docs, "name");
        List<String> expectedNames = Arrays.asList("test deck 1", "test deck 2", "test deck 3", "test deck 4");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void addDeckNoName() {
        Document addResult = deckController.addNewDeck("");
        assertNull("result should be null", addResult);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = deckController.getDecks(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 decks", 3, docs.size());
        List<String> names = getStringsFromBsonArray(docs, "name");
        List<String> expectedNames = Arrays.asList("test deck 1", "test deck 2", "test deck 3");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void addThreeDecks() {
        deckController.addNewDeck("test deck 4");
        deckController.addNewDeck("test deck 5");
        deckController.addNewDeck("test deck 6");
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = deckController.getDecks(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 decks", 6, docs.size());
    }

    @Test
    public void checkNewDReturnedDeck() {
        Document addResult = deckController.addNewDeck("test deck 4");
        String jsonResult = deckController.getDeck(addResult.getObjectId("_id").toHexString());
        Document testDeck = Document.parse(jsonResult);
        assertEquals("Decks should match", addResult, testDeck);
    }


}
