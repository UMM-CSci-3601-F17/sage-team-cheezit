package umm3601.user;

import com.google.gson.Gson;

import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

/**
 * A fake "database" of user info
 *
 * Since we don't want to complicate this lab with a real database,
 * we're going to instead just read a bunch of user data from a
 * specified JSON file, and then provide various database-like
 * methods that allow the `UserController` to "query" the "database".
 */
public class Database {

  private User[] allUsers;

  public Database(String userDataFile) throws IOException {
    Gson gson = new Gson();
    FileReader reader = new FileReader(userDataFile);
    allUsers = gson.fromJson(reader, User[].class);
  }

  /**
   * Get the single user specified by the given ID. Return
   * `null` if there is no user with that ID.
   *
   * @param id the ID of the desired user
   * @return the user with the given ID, or null if there is no user
   * with that ID
   */
  public User getUser(String id) {
    return Arrays.stream(allUsers).filter(x -> x._id.equals(id)).findFirst().orElse(null);
  }

  /**
   * Get an array of all the users satisfying the queries in the params.
   *
   * @param queryParams map of required key-value pairs for the query
   * @return an array of all the users matching the given criteria
   */
  public User[] listUsers(Map<String, String[]> queryParams) {
    User[] filteredUsers = allUsers;

    // Filter age if defined
    if(queryParams.containsKey("age")) {
      int targetAge = Integer.parseInt(queryParams.get("age")[0]);
      filteredUsers = filterUsersByAge(filteredUsers, targetAge);
    }
    // Process other query parameters here...

    return filteredUsers;
  }

  /**
   * Get an array of all the users having the target age.
   *
   * @param users the list of users to filter by age
   * @param targetAge the target age to look for
   * @return an array of all the users from the given list that have
   * the target age
   */
  public User[] filterUsersByAge(User[] users, int targetAge) {
    return Arrays.stream(users).filter(x -> x.age == targetAge).toArray(User[]::new);
  }

}
