export default interface BaseSeeder {
  seed(): Promise<void>;
  init(): Promise<void>;
}
