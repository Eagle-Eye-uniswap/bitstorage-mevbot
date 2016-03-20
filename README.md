# Bitstorage
Api easily access Javascripts local storage

The Javascript class that allows you to easily access the local storage to store simple values, arrays and objects.
Bitstorage also allows to easily search and manage your data using simple methodes.

## Installation
```
<script src="bitstorage.js"></script>
```

## Code Example
### Simpel example
```js
    // Create a new storage container
    var vars = new bitstorage('vars');
    // Clear the storage container to make sure it's empty, Warning this will Delete all previous entries!
    vars.clear();
    // Insert records into the container
    var stringId1 = vars.insert('Normal text');
    var stringId2 = vars.insert('Second text');
    // Update the first record
    vars.update(stringId1, 'Changed text');
    
    // Output array: ["Changed text", "Second text"]
    console.log(vars.getAll());
    
    // Output string: "Changed text"
    console.log(vars.get(stringId1));
    
    // Output array: [1], find returns an array with keys that match the search query, use get() to retrieve the contents
    console.log(vars.find('Second text'));
    // Output array:  [0, 1], findLike returns an array with keys that match the search query, use get() to retrieve the contents
    console.log(vars.findLike('text'));
    
    var searchResults = vars.findLike('text');
    // Output string: "Changed text", the first search result
    console.log(vars.get(searchResults[0]));
    
    // Output the current size of the storage container
    console.log(vars.getSizeInKb());
```

### Advanced example

```js
    
    // Create a new storage container
    var users = new bitstorage('users');
    // Clear the storage container to make sure it's empty, Warning this will Delete all previous entries!
    users.clear();
    // Insert new objects into storage container
    users.insert({id:5, name: 'James Flint', tel: '0622125'});
    users.insert({id:6, name: 'Charles Vane', tel: '0622654'});
    // Insert will give an unique key that allows you to retrieve the object
    var userid = users.insert({id:7, name: 'Eleanor Guthrie', tel: '062987'});
    
    // Output array: [Object { id=5,  name="Flint",  tel="0622125"}, Object { id=6,  name="Jack",  tel="0622654"}, Object { id=7,  name="Elanor",  tel="062987"}]
    console.log(users.getAll());
    
    // Retrieve the user object
    var user = users.get(userid);
    // Rename Elanor into Max
    user.name = 'Max';
    // Save the changed object
    users.update(userid, user);
    // Output array: [Object { id=5,  name="Flint",  tel="0622125"}, Object { id=6,  name="Jack",  tel="0622654"}, Object { id=7,  name="Max",  tel="062987"}]
    console.log(users.getAll());
    
    // Search user on the field 'id', an array of keys will be returnend
    var foundUserId = users.findByKey('id', 7);
    // Retrieve the first user object
    var foundUser = users.get(foundUserId[0]);
    // Change the users name
    foundUser.name = 'Anne Bonny';
    // Save the changed object
    users.update(userid, foundUser);
    // Output array: [Object { id=5,  name="James Flint",  tel="0622125"}, Object { id=6,  name="Charles Vane",  tel="0622654"}, Object { id=7,  name="Anne Bonny",  tel="062987"}]
    console.log(users.getAll());
    
    // Search all objects for a string, findLike is not case sensitive, unlike find that is case sensitive
    var foundUserIds = users.findLike('An');
    // Output array: [1, 2], we found Charles Vane and Anne Bonny (who replaced Eleanor Guthrie)
    console.log(foundUserIds);
    
    // Search all objects for a string, findLike is not case sensitive, unlike find that is case sensitive
    var foundUserIds = users.findByKeyLike('tel', '0622');
    // Output array: [0, 1], we found James Flint and Charles Vane
    console.log(foundUserIds);
    
    // Delete user Anne Bonny, this record is undefined after delete to keep the key structure intact.
    users.delete(userid);
    // Output [Object { id=5,  name="James Flint",  tel="0622125"}, Object { id=6,  name="Charles Vane",  tel="0622654"}, undefined]
    console.log(users.getAll());
    
    users.insert({id:9, name: 'Billy Bones', tel: '0625797'});
    // Output 4 records where the third is undefined because of the delete
    console.log(users.getAll());
    
    // Use clean to remove undefined records, warning this will change the existing keys!
    users.clean();
    // Output 3 records, array: [Object { id=5,  name="James Flint",  tel="0622125"}, Object { id=6,  name="Charles Vane",  tel="0622654"}, Object { id=9,  name="Billy Bones",  tel="0625797"}]
    console.log(users.getAll());
```

## API Reference

### insert (`Mixed`)
Insert a value like string, int, array or object.

returns: `Int` key of the insert record.
```js
var users = new bitstorage('users');
users.insert({id:5, name: 'James Flint', tel: '0622125'});
```

### update (`Int`,`Mixed`)
Update an existing record with a value like string, int, array or object.

returns: `Int` key of the updated record.
```js
var foundUserId = users.findByKey('id', 7);
var foundUser = users.get(foundUserId[0]);
foundUser.name = 'Anne Bonny';
users.update(foundUserId[0], foundUser);
```

### delete (`Int`)
Delete an record.
```js
var foundUserId = users.findByKey('id', 7);
users.delete(foundUserId[0]);
```

### clean ()
Remove deleted objects from the storage.
Warning this will change the records keys!
```js
users.clean();
```

### clear ()
Remove all records in the data storages.
```js
users.clear();
```

### get (`Int`)
Retrieve a single record.

returns: `Mixed`.
```js
var user = users.get(1);
```

### getAll ()
Retrieve all records in storage object.

returns: `Array`
```js
var allUsers = users.getAll();
```

### find (`Mixed`)
Search all records for given value.

returns: `Array` of keys that matched.
```js
var result = users.find('James Flint');
for(n in result){
  users.get(result[n]);
}
```

### findLike (`Mixed`)
Search all records that have part of the given string.

returns: `Array` of keys that matched
```js
var result = users.findLike('Flint');
for(n in result){
  users.get(result[n]);
}
```

### findByKey (`String`, `Mixed`)
Search all records for given value for a specific field.

returns: `Array` of keys that matched
```js
var result = users.findByKey('name','James Flint');
for(n in result){
  users.get(result[n]);
}
```

### findByKeyLike (`String`, `Mixed`)
Search all records that have part of the given string for a specific field.

returns: `Array` of keys that matched
```js
var result = users.findByKeyLike('name','Flint');
for(n in result){
  users.get(result[n]);
}
```

### getSizeInKb ()
Retrieves the size used by the data storage in KB.

returns: `Float` size of the storage used in KB
```js
users.clear();
```


## License

This code is free off use under the MIT license.
