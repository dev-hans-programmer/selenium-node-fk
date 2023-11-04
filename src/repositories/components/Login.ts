import ExcelManipulator from '../../framework/files/excel';
import LoginPOM from '../poms/common/LoginPOM';
import Run from './Run';

class Login extends Run {
   private login: LoginPOM;
   private testData: ExcelManipulator;
   constructor(testDataPath: string) {
      super();
      // Need to initialise the test data and pass it to the constructor
      this.testData = new ExcelManipulator(testDataPath);
      this.login = new LoginPOM(this.testData.getSheetData('Data'));
   }

   public async run(): Promise<void> {
      console.log('LAUNCHING BROWSER');
      await this.login.launch();
      await this.login.login();
   }
}

export default Login;
