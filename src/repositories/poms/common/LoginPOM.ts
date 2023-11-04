import { By, until, Builder } from 'selenium-webdriver';

let init = 0;
class LoginPOM {
   private driver: any;

   private testData: any;

   constructor(testData: any) {
      this.testData = testData[0];
   }

   public async launch() {
      init++;
      this.driver = new Builder().forBrowser('chrome').build();
      try {
         await this.driver.get(this.testData.Url);
      } catch (err) {
         console.log(err);
      }
      console.log('FREQUENCY', init);
   }
   public async login() {
      // login for flits
      await this.driver
         .findElement(By.name('email'))
         .sendKeys(this.testData.Username);
      await this.driver
         .findElement(By.name('password'))
         .sendKeys(this.testData.Password);

      await this.driver
         .findElement(By.xpath("//button[text()='Login']"))
         .click();

      // setTimeout(async () => {
      //    await this.driver.quit();
      // }, 2000);
   }
   public async logout() {
      const expandEle = this.driver.findElement(
         By.xpath("//div[@class='profile']//*[@data-testid='ExpandMoreIcon']")
      );
      await this.driver.wait(
         until.elementLocated(
            By.xpath(
               "//div[@class='profile']//*[@data-testid='ExpandMoreIcon']"
            )
         )
      );

      await expandEle.click();
      await this.driver.findElement(By.xpath("//p[text()='Logout']")).click();
   }
}

export default LoginPOM;
