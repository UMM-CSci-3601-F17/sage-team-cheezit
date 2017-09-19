package umm3601;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Util {
  /**
   * Constructs a JsonObject representing the response to a successful REST request
   * as described in the JSend "standard" (http://labs.omniti.com/labs/jsend). This
   * has a successful status, and the data field is a JSON object that contains
   * the given name/value pair.
   *
   * @param name the name of the returned value
   * @param value the value to return
   * @return the a successful JSON response object
   */
  public static JsonObject buildSuccessJsonResponse(String name, JsonElement value) {
    JsonObject dataObject = new JsonObject();
    dataObject.add(name, value);

    JsonObject resultObject = new JsonObject();
    resultObject.addProperty("status", "success");
    resultObject.add("data", dataObject);

    return resultObject;
  }

  public static JsonObject buildFailJsonResponse(String errorField, String errorMessage) {
    JsonObject dataObject = new JsonObject();
    dataObject.addProperty(errorField, errorMessage);

    JsonObject resultObject = new JsonObject();
    resultObject.addProperty("status", "fail");
    resultObject.add("data", dataObject);

    return resultObject;
  }
}
