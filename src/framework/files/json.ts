import fs from 'fs';

class Json {
   private data: any;
   constructor(private filePath: string) {
      this.loadJson();
   }

   private loadJson() {
      const data = fs.readFileSync(this.filePath).toString();
      this.data = JSON.parse(data);
   }

   public getByKey(key: string): any {
      return this.data[key];
   }
}

export default Json;
