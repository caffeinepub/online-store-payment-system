import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  type Item = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    image : Storage.ExternalBlob;
  };

  let items = Map.empty<Text, Item>();

  func getItem(id : Text) : Item {
    switch (items.get(id)) {
      case (?item) { item };
      case (null) { Runtime.trap("Item not found.") };
    };
  };

  public query ({ caller }) func getItems() : async [Item] {
    items.values().toArray();
  };

  public shared ({ caller }) func addItem(id : Text, name : Text, description : Text, price : Nat, image : Storage.ExternalBlob) : async () {
    if (items.containsKey(id)) { Runtime.trap("Item with this id already exists.") };
    let item : Item = {
      id;
      name;
      description;
      price;
      image;
    };
    items.add(id, item);
  };

  public shared ({ caller }) func processPayment(itemId : Text) : async Nat {
    getItem(itemId).price;
  };

  public shared ({ caller }) func deleteItem(id : Text) : async () {
    if (not items.containsKey(id)) { Runtime.trap("Item does not exist.") };
    items.remove(id);
  };
};
