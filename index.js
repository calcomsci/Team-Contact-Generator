const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const { countReset } = require("console");
const { create } = require("domain");


const people = [];

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

const getPersonInfo = () => {
   inquirer.prompt([
    {
      type: "input",
      message: "What is your manager's name?",
      name: "managername",
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "managerid",
    },
    {
      type: "input",
      message: "What is your manager's e-mail address?",
      name: "manageremail",
    },
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "manageroffice",
    },
  
  ]).then((managerInfo) =>{
    createManager(managerInfo)
  })
};

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const createManager = (personInfo) => {
  const manager = new Manager (personInfo.managername, personInfo.managerid, personInfo.manageremail, personInfo.manageroffice)
  people.push(manager);
  loop();
};

const createEngineer = (personInfo) => {
  const engineer = new Engineer (personInfo.engineername, personInfo.engineerid, personInfo.engineeremail, personInfo.engineergit)
  people.push(engineer);
  loop();
};

const createIntern = (personInfo) => {
  const intern = new Intern (personInfo.internname, personInfo.internrid, personInfo.internemail, personInfo.internschool)
  people.push(intern);
  loop();
};

const createTeam = () => {
  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }fs.writeFileSync(outputPath, render(people), "utf-8");

}

const getEngineerInfo = () => {
  inquirer.prompt ([
    {
      type:"input",
      message:"What is the Engineer's name?",
      name:'engineername',
    },
    {
      type:"input",
      message:"What is the Engineer's id?",
      name:'engineerid',
    },
    {
      type:"input",
      message:"What is the Engineer's e-mail address?",
      name:'engineeremail',
    },
    {
      type:"input",
      message:"What is the Engineer's Github?",
      name:'engineergit',
    }
    

  ]).then((engineeringInfo) => {
   createEngineer(engineeringInfo)
  }) 

}

const getInternInfo = () => {
  inquirer.prompt ([
    {
      type:"input",
      message:"What is the Intern's name?",
      name:'internname',
    },
    {
      type:"input",
      message:"What is the Intern's id?",
      name:'internrid',
    },
    {
      type:"input",
      message:"What is the Intern's email?",
      name:'internemail',
    },
    {
      type:"input",
      message:"What is the Intern's School?",
      name:'internschool',
    }
    

  ]).then((internInfo) => {
   createIntern(internInfo)
  }) 

}

const loop = () => {
 inquirer.prompt([
   {
     type: "list",
     name: "teammember",
     choices: [
       "Engineer", "Intern", "I dont want to add any more team members."
     ]
   }
 ])
    .then((personInfo) => {

      switch(personInfo.teammember){
        case 'I dont want to add any more team members.':
          createTeam();
        break;

        case 'Engineer':
        getEngineerInfo()
        break;

        
        case 'Intern':
        getInternInfo()
        break;
      }
    })

};

getPersonInfo();







