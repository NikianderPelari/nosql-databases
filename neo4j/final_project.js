// Put the use case you chose here. Then justify your database choice:
// I decided to do a rid sharing app and decided to implement this using neo4j. I used neo because building and quering distance relationship seemed easiest
// on this platform
//
// Explain what will happen if coffee is spilled on one of the servers in your cluster, causing it to go down.
// Besides the amazing aroma of hazelnut, my data would be corrupted momentarily until distances are updated again.
//
// What data is it not ok to lose in your app? What can you do in your commands to mitigate the risk of lost data?
// User information would not be okay to lose because unlike distances this can not be updated. From a command stand point, I can store the user information
// in different locations so that I will always have a source to refer to. 


// Create Nodes.

CREATE (n:User {name: 'Jim',  location: 'Chinatown'});
CREATE (n:User {name: 'Bill', location: 'Jamaica Plain' });
CREATE (n:User {name: 'Jack', location: 'Dorchester'  });
CREATE (n:Dock {location: 'West Roxbury',  avail_bikes: '5', total_bikes: '10'});
CREATE (n:Dock {location: 'Hyde Park',     avail_bikes: '3', total_bikes: '10'});
CREATE (n:Dock {location: 'Roslindale',    avail_bikes: '4', total_bikes: '10'});
CREATE (n:Dock {location: 'Mattapan',      avail_bikes: '1', total_bikes: '10'});
CREATE (n:Dock {location: 'Dorchester',    avail_bikes: '2', total_bikes: '10'});
CREATE (n:Dock {location: 'Jamaica Plain', avail_bikes: '0', total_bikes: '10'});
CREATE (n:Dock {location: 'Roxbury',       avail_bikes: '1', total_bikes: '10'});
CREATE (n:Dock {location: 'Mission Hill',  avail_bikes: '6', total_bikes: '10'});
CREATE (n:Dock {location: 'South End',     avail_bikes: '8', total_bikes: '10'});
CREATE (n:Dock {location: 'South Boston',  avail_bikes: '4', total_bikes: '10'});
CREATE (n:Dock {location: 'Back Bay',      avail_bikes: '3', total_bikes: '10'});
CREATE (n:Dock {location: 'Beacon Hill',   avail_bikes: '2', total_bikes: '10'});
CREATE (n:Dock {location: 'Chinatown',     avail_bikes: '1', total_bikes: '10'});
CREATE (n:Dock {location: 'Charlestown',   avail_bikes: '0', total_bikes: '10'});
CREATE (n:Dock {location: 'Downtown',      avail_bikes: '7', total_bikes: '10'});


// Create Relationships

MATCH (a:Family_Member),(b:Family_Member)
       WHERE a.name = 'Jim' AND b.name = 'Bill'
       CREATE (a)-[r:SPOUSE_OF {married: 1982}]->(b)
       RETURN type(r), r.married;

MATCH (a:Family_Member),(b:Family_Member)
       WHERE a.name = 'Jim' AND b.name = 'Jack'
       CREATE (a)-[r:FATHER_OF {year: 1994}]->(b)
       RETURN type(r), r.year;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'West Roxbury' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 15}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Hyde Park' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 13}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Roslindale' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 12}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Mattapan' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 9}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Dorchester' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 7}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Jamaica Plain' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 6}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Roxbury' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 5}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Mission Hill' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 6}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'South End' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 2}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'South Boston' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 3}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Back Bay' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 2}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Beacon Hill' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 1}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Chinatown' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 1}]->(b)
       RETURN type(r), r.miles;

MATCH (a:Dock),(b:Dock)
       WHERE a.location = 'Charlestown' AND b.location = 'Downtown'
       CREATE (a)-[r:DISTANCE {miles: 2}]->(b)
       RETURN type(r), r.miles;



// Action 1: Return all docking locations and distances
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock)
       RETURN type(c), place.location, dock.location, c.miles;

// Action 2: Find number of bikes at location Back Bay
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Back Bay'})
       RETURN dock.location, dock.avail_bikes;

// Action 3: Find number of bikes at location Charlestown
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Charlestown'})
       RETURN dock.location, dock.avail_bikes;

// Action 4: Find number of bikes at location Roslindale
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Roslindale'})
       RETURN dock.location, dock.avail_bikes;

// Action 5: Find number of bikes at location Beacon Hill
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Beacon Hill'})
       RETURN dock.location, dock.avail_bikes;

// Action 6: Find number of bikes at location Chinatown
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Chinatown'})
       RETURN dock.location, dock.avail_bikes;

// Action 7: Find number of bikes at location Dorchester 
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Dorchester'})
       RETURN dock.location, dock.avail_bikes;

// Action 8: Find number of bikes at location Mattapan
MATCH (place:Dock {location: 'Downtown'})<-[c]-(dock: Dock {location: 'Mattapan'})
       RETURN dock.location, dock.avail_bikes;