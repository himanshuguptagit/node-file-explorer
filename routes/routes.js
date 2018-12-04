
const moduleController_i = require("../controllers/moduleController");

class Routes{

  constructor(){
    this.moduleController = new moduleController_i.ModuleController();
  }

  routes(app){
    app.route("/Modules")
    .get(this.moduleController.getModules)
    .post(this.moduleController.createModule);

    app.route("/Modules/:name")
    .get(this.moduleController.getModuleByName);
  }

}

module.exports.Routes = Routes;
