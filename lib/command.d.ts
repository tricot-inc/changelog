declare type Args = [string, string];
interface Options {
    token?: string;
}
export declare function action(args: Args, options: Options): Promise<void>;
export {};
