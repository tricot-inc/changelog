declare const PREFIX_TITLE: {
    feat: string;
    update: string;
    fix: string;
    docs: string;
    refactor: string;
    test: string;
    clean: string;
    chore: string;
};
export declare type PREFIX = keyof typeof PREFIX_TITLE;
interface Commit {
    author: string;
    prefix: PREFIX;
    body: string;
}
export declare function generateCHANGELOG(commits: Commit[]): void;
export {};
