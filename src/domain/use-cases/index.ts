export interface UseCase<Input = unknown, Output = unknown> {
  execute(input?: Input): Output | Promise<Output>;
}
