import Engine from './framework/handlers/engine';

async function run() {
   try {
      new Engine(__dirname + '/repositories/data/scenarios.xlsx').run();
   } catch (err) {
      console.log(err);
   }
}

run();
