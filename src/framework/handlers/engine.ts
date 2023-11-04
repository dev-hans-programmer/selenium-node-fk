import ExcelManipulator from '../files/excel';
import Flow from './flow';
import Settings from '../utils/settings';
import VideoRecording from '../reports/video';

const CONFIG_FILE_PATH =
   '/Users/hasanali/Documents/Engineering/node-js/selenium-framework/src/framework/config/settings.json';

class Engine {
   constructor(private filePath: string) {}
   public async run() {
      const excelManipulator = new ExcelManipulator(this.filePath);
      const files = excelManipulator.getSheetData('Data');

      const settings = new Settings(CONFIG_FILE_PATH);

      for (const file of files) {
         const { File, Run, Name } = file;
         const video = new VideoRecording(`/video/${File}.mp4`);

         if (Run === 'Y') {
            const flow = new Flow(
               `${settings.getScenariosPath()}/${File}.json`,
               settings
            );
            video.startRecording();
            await flow.run();
            video.stopRecording();
         }
      }
   }
}

export default Engine;
