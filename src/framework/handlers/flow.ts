import Json from '../files/json';
import Settings from '../utils/settings';

interface Step {
   type: string;
   component: string;
}

class Flow {
   private jsonData: Json;
   private settings: Settings;

   constructor(private filePath: string, settings: Settings) {
      console.log('FLOW INITIALISED', filePath);
      this.jsonData = new Json(this.filePath);
      this.settings = settings;
   }

   public async run() {
      const steps = this.jsonData.getByKey('steps');
      const testDataPath = this.jsonData.getByKey('testData');

      await this.handleSteps(steps, testDataPath);
   }
   private async handleSteps(steps: Step[], testDataPath: string) {
      console.log('HANDLING STEPS');
      for (let step of steps) {
         const { type, component } = step;

         switch (type) {
            case 'component':
               await this.handleComponent(component, testDataPath);
         }
      }
   }
   private async handleComponent(component: string, testData: string) {
      console.log('HANDLING COMPONENT');
      // Need to get the component and run the run function

      const Class = await import(
         `${this.settings.getComponentPath()}/${component}.ts`
      );
      console.log('Got dynamic class');

      const instance = new Class.default(
         `${this.settings.getTestDataPath()}/${testData}`
      );
      await instance.run();
   }
}

export default Flow;
