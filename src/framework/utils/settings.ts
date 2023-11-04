import Json from '../files/json';

class Settings {
   private json: Json;
   constructor(private filePath: string) {
      this.json = new Json(filePath);
   }
   public getScenariosPath(): string {
      return this.json.getByKey('scenariosPath');
   }
   public getComponentPath(): string {
      return this.json.getByKey('componentPath');
   }
   public getTestDataPath(): string {
      return this.json.getByKey('testDataPath');
   }
}

export default Settings;
