package umm3601.mongotest;

import com.mongodb.MongoClient;
import com.mongodb.client.*;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import org.bson.Document;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static org.junit.Assert.*;

/**
 * Some simple "tests" that demonstrate our ability to
 * connect to a Mongo database and run some basic queries
 * against it.
 *
 * Note that none of these are actually tests of any of our
 * code; they are mostly demonstrations of the behavior of
 * the MongoDB Java libraries. Thus if they test anything,
 * they test that code, and perhaps our understanding of it.
 *
 * To test "our" code we'd want the tests to confirm that
 * the behavior of methods in things like the UserController
 * do the "right" thing.
 *
 * Created by mcphee on 20/2/17.
 */
public class MongoSpec {

    private MongoCollection<Document> userDocuments;

    @Before
    public void clearAndPopulateDB() {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        userDocuments = db.getCollection("users");
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
        userDocuments.insertMany(testUsers);
    }

    private List<Document> intoList(MongoIterable<Document> documents) {
        List<Document> users = new ArrayList<>();
        documents.into(users);
        return users;
    }

    private int countUsers(FindIterable<Document> documents) {
        List<Document> users = intoList(documents);
        return users.size();
    }

    @Test
    public void shouldBeThreeUsers() {
        FindIterable<Document> documents = userDocuments.find();
        int numberOfUsers = countUsers(documents);
        assertEquals("Should be 3 total users", 3, numberOfUsers);
    }

    @Test
    public void shouldBeOneChris() {
        FindIterable<Document> documents = userDocuments.find(eq("name", "Chris"));
        int numberOfUsers = countUsers(documents);
        assertEquals("Should be 1 Chris", 1, numberOfUsers);
    }

    @Test
    public void shouldBeTwoOver25() {
        FindIterable<Document> documents = userDocuments.find(gt("age", 25));
        int numberOfUsers = countUsers(documents);
        assertEquals("Should be 2 over 25", 2, numberOfUsers);
    }

    @Test
    public void over25SortedByName() {
        FindIterable<Document> documents
                = userDocuments.find(gt("age", 25))
                    .sort(Sorts.ascending("name"));
        List<Document> docs = intoList(documents);
        assertEquals("Should be 2", 2, docs.size());
        assertEquals("First should be Jamie", "Jamie", docs.get(0).get("name"));
        assertEquals("Second should be Pat", "Pat", docs.get(1).get("name"));
    }

    @Test
    public void over25AndIbmers() {
        FindIterable<Document> documents
                = userDocuments.find(and(gt("age", 25),
                                         eq("company", "IBM")));
        List<Document> docs = intoList(documents);
        assertEquals("Should be 1", 1, docs.size());
        assertEquals("First should be Pat", "Pat", docs.get(0).get("name"));
    }

    @Test
    public void justNameAndEmail() {
        FindIterable<Document> documents
                = userDocuments.find().projection(fields(include("name", "email")));
        List<Document> docs = intoList(documents);
        assertEquals("Should be 3", 3, docs.size());
        assertEquals("First should be Chris", "Chris", docs.get(0).get("name"));
        assertNotNull("First should have email", docs.get(0).get("email"));
        assertNull("First shouldn't have 'company'", docs.get(0).get("company"));
        assertNotNull("First should have '_id'", docs.get(0).get("_id"));
    }

    @Test
    public void justNameAndEmailNoId() {
        FindIterable<Document> documents
                = userDocuments.find()
                .projection(fields(include("name", "email"), excludeId()));
        List<Document> docs = intoList(documents);
        assertEquals("Should be 3", 3, docs.size());
        assertEquals("First should be Chris", "Chris", docs.get(0).get("name"));
        assertNotNull("First should have email", docs.get(0).get("email"));
        assertNull("First shouldn't have 'company'", docs.get(0).get("company"));
        assertNull("First should not have '_id'", docs.get(0).get("_id"));
    }

    @Test
    public void justNameAndEmailNoIdSortedByCompany() {
        FindIterable<Document> documents
                = userDocuments.find()
                .sort(Sorts.ascending("company"))
                .projection(fields(include("name", "email"), excludeId()));
        List<Document> docs = intoList(documents);
        assertEquals("Should be 3", 3, docs.size());
        assertEquals("First should be Jamie", "Jamie", docs.get(0).get("name"));
        assertNotNull("First should have email", docs.get(0).get("email"));
        assertNull("First shouldn't have 'company'", docs.get(0).get("company"));
        assertNull("First should not have '_id'", docs.get(0).get("_id"));
    }

    @Test
    public void ageCounts() {
        AggregateIterable<Document> documents
                = userDocuments.aggregate(
                Arrays.asList(
                        /*
                         * Groups data by the "age" field, and then counts
                         * the number of documents with each given age.
                         * This creates a new "constructed document" that
                         * has "age" as it's "_id", and the count as the
                         * "ageCount" field.
                         */
                        Aggregates.group("$age",
                                Accumulators.sum("ageCount", 1)),
                        Aggregates.sort(Sorts.ascending("_id"))
                )
        );
        List<Document> docs = intoList(documents);
        assertEquals("Should be two distinct ages", 2, docs.size());
        assertEquals(docs.get(0).get("_id"), 25);
        assertEquals(docs.get(0).get("ageCount"), 1);
        assertEquals(docs.get(1).get("_id"), 37);
        assertEquals(docs.get(1).get("ageCount"), 2);
    }

    @Test
    public void averageAge() {
        AggregateIterable<Document> documents
                = userDocuments.aggregate(
                        Arrays.asList(
                                Aggregates.group("$company",
                                        Accumulators.avg("averageAge", "$age")),
                                Aggregates.sort(Sorts.ascending("_id"))
                        ));
        List<Document> docs = intoList(documents);
        assertEquals("Should be three companies", 3, docs.size());

        assertEquals("Frogs, Inc.", docs.get(0).get("_id"));
        assertEquals(37.0, docs.get(0).get("averageAge"));
        assertEquals("IBM", docs.get(1).get("_id"));
        assertEquals(37.0, docs.get(1).get("averageAge"));
        assertEquals("UMM", docs.get(2).get("_id"));
        assertEquals(25.0, docs.get(2).get("averageAge"));
    }

}
