const PROTO_PATH = __dirname + '/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, { keepCase: true, enums: String, defaults: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
// The protoDescriptor object has the full package hierarchy

var client = new todoproto.TodoService('0.0.0.0:50051', grpc.credentials.createInsecure());
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task")
function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log('response',response);
}

function todosList() {
  client.list({}, function (error, todos) {
       printResponse(error, todos);
    });
    }


function insertTodo( todo, description) {
    var todo = {
        todo: todo,
        description: description
    };
    client.insert(todo, function (error, empty) {
        console.log("Task INSERTED SUCCESSFULLY");
        printResponse(error, empty);
    });
}

function getTodo(todo) {
    client.get({
        todo:todo
    }, function (error, todo) {
        printResponse(error, todo);
    });
}

function deleteTodo(todo) {
    client.delete({
        todo:todo
    }, function (error, empty) {
        console.log("TASK DELETED SUCCESSFULLY");
        
        printResponse(error, empty);
    });
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
    todosList();
else if (command == 'insert')
    insertTodo(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getTodo(process.argv[0]);
else if (command == 'delete')
    deleteTodo(process.argv[0]);