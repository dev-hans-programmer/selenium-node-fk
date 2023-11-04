import XLSX from 'xlsx';

class ExcelManipulator {
   public workbook: XLSX.WorkBook;
   constructor(private filePath: string) {
      this.workbook = XLSX.readFile(filePath);
   }

   getSheetNames(): string[] {
      return this.workbook.SheetNames;
   }

   getRows() {
      return this;
   }

   getSheetData(sheetName: string) {
      const worksheet: XLSX.WorkSheet = this.workbook.Sheets[sheetName];
      const rawRows = XLSX.utils.sheet_to_json(worksheet, {
         header: 1,
      }) as any;

      const header = rawRows[0] as [string, string, string, string];
      const rows = [];
      for (let i = 1; i < rawRows.length; i++) {
         const obj: any = {};
         for (const [index, key] of Object.entries(header)) {
            if (rawRows[i][index]) obj[key] = rawRows[i][index];
         }
         if (Object.keys(obj).length > 0) rows.push(obj);
      }

      return rows;
   }

   getCellData(sheetName: string, cellAddress: string) {
      const worksheet = this.workbook.Sheets[sheetName];
      const cell = worksheet[cellAddress];
      return cell ? cell.v : '';
   }

   setCellData(sheetName: string, cellAddress: string, value: string) {
      const worksheet = this.workbook.Sheets[sheetName];
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found.`);
      }

      worksheet[cellAddress] = { v: value };
   }

   save() {
      XLSX.writeFile(this.workbook, this.filePath);
   }
}

export default ExcelManipulator;
