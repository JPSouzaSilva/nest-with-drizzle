export abstract class EmailAdapter {
  abstract send(to: string, subject: string, html?: string): Promise<void>;
}
