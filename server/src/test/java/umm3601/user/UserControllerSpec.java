package umm3601.user;

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

/**
 * JUnit tests for the UserController.
 *
 * Created by mcphee on 22/2/17.
 */
public class UserControllerSpec
{
    private UserController userController;
    private String samsIdString;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> userDocuments = db.getCollection("users");
        userDocuments.drop();
        List<Document> testUsers = new ArrayList<>();
        testUsers.add(Document.parse("{\n" +
                "                    name: \"Chris\",\n" +
                "                    age: 25,\n" +
                "                    company: \"UMM\",\n" +
                "                    email: \"chris@this.that\"\n" +
                "                }"));
        testUsers.add(Document.parse("{\n" +
                "                    name: \"Pat\",\n" +
                "                    age: 37,\n" +
                "                    company: \"IBM\",\n" +
                "                    email: \"pat@something.com\"\n" +
                "                }"));
        testUsers.add(Document.parse("{\n" +
                "                    name: \"Jamie\",\n" +
                "                    age: 37,\n" +
                "                    company: \"Frogs, Inc.\",\n" +
                "                    email: \"jamie@frogs.com\"\n" +
                "                }"));
        ObjectId samsId = new ObjectId();
        BasicDBObject sam = new BasicDBObject("_id", samsId);
        sam = sam.append("name", "Sam")
                .append("age", 45)
                .append("company", "Frogs, Inc.")
                .append("email", "sam@frogs.com");
        samsIdString = samsId.toHexString();
        userDocuments.insertMany(testUsers);
        userDocuments.insertOne(Document.parse(sam.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        userController = new UserController();
    }

    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
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

    private static String getName(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("name")).getValue();
    }

    @Test
    public void getAllUsers() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = userController.listUsers(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 users", 4, docs.size());
        List<String> names = docs
                .stream()
                .map(UserControllerSpec::getName)
                .sorted()
                .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Chris", "Jamie", "Pat", "Sam");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getUsersWhoAre37() {
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("age", new String[] { "37" });
        String jsonResult = userController.listUsers(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 2 users", 2, docs.size());
        List<String> names = docs
                .stream()
                .map(UserControllerSpec::getName)
                .sorted()
                .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Jamie", "Pat");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getSamById() {
        String jsonResult = userController.getUser(samsIdString);
        Document sam = Document.parse(jsonResult);
        assertEquals("Name should match", "Sam", sam.get("name"));
    }
}
