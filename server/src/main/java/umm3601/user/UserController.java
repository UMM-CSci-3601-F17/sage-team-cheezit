package umm3601.user;

import com.google.gson.Gson;

import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

public class UserController {

    private User[] users;

    public UserController() throws IOException {
        Gson gson = new Gson();
        FileReader reader = new FileReader("src/main/data/users.json");
        users = gson.fromJson(reader, User[].class);
    }

    // List users
    public User[] listUsers(Map<String, String[]> queryParams) {
        User[] filteredUsers = users;

        // Filter age if defined
        if(queryParams.containsKey("age")) {
            int age = Integer.parseInt(queryParams.get("age")[0]);
            filteredUsers = filterUsersByAge(filteredUsers, age);
        }

        return filteredUsers;
    }

    // Filter users by age
    public User[] filterUsersByAge(User[] filteredUsers, int age) {
        return Arrays.stream(filteredUsers).filter(x -> x.age == age).toArray(User[]::new);
    }

    // Get a single user
    public User getUser(String id) {
        return Arrays.stream(users).filter(x -> x._id.equals(id)).findFirst().orElse(null);
    }

}