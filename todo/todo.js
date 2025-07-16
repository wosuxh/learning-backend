const fs = require("fs");
// this is for file system
const filePath = "./todo/tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath, "utf-8"); // after writing utf-8 there is no need for changing it to string because it is already converted
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task Added Successfully: ${task}`);
};

const listTasks = () => {
  const tasks = loadTasks();
  const tasksNo = tasks.length;
  for (let i = 0; i < tasksNo; i++) {
    console.log(`${i + 1}: ${tasks[i]}`);
  }
};

const removeTask = (task) => {
  const tasks = loadTasks();
  tasks.splice(task - 1, 1);
  saveTasks(tasks);
};
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command Not found");
}
