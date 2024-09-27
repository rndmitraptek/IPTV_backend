export class StringHelper {
    static async isNullOrEmpty (text: string): Promise<boolean> {
      return text == '' || text == undefined
    }
} 