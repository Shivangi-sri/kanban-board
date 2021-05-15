#Kanband Board

Kanban Borad is used to manage users daily task.User can perform following operations:
1. User can move any cards from one bucket to another.
2. Every cards needs to have a unique number associated to it. As a user,
you must be able to distinguish each task from other.
3. As a user, you can add a new card in any bucket.
4. As a user, you can also sort the task in the Bucket.

## Installation / pre-requisites
1. Unzip the folder.
2. Run "npm install" to install the dependencies.
3. Run "npm start" to start the server.

## Integration
1. Create a React app using command "npx create-react-app kanban-board".
2. Install "react-redux" library for state management.
3. Created a board UI using React.
4. Stored all the initial tasks in store.
5. Access tasks from store using connect.
6. When user add new tasks, add that task in store.
7. Sort Redux state  in ascending order when user clicks on sort icon.
