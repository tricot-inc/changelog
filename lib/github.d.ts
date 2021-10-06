import { Octokit } from "@octokit/rest";
export declare function createGitHubClient(token: string): Octokit;
interface ComparePayload {
    owner: string;
    repo: string;
    target: string;
}
export declare function compare(client: Octokit, payload: ComparePayload): Promise<import("@octokit/types").OctokitResponse<{
    url: string;
    html_url: string;
    permalink_url: string;
    diff_url: string;
    patch_url: string;
    base_commit: {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            committer: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            message: string;
            comment_count: number;
            tree: {
                sha: string;
                url: string;
            };
            verification?: {
                verified: boolean;
                reason: string;
                payload: string | null;
                signature: string | null;
            } | undefined;
        };
        author: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        committer: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        parents: {
            sha: string;
            url: string;
            html_url?: string | undefined;
        }[];
        stats?: {
            additions?: number | undefined;
            deletions?: number | undefined;
            total?: number | undefined;
        } | undefined;
        files?: {
            filename?: string | undefined;
            additions?: number | undefined;
            deletions?: number | undefined;
            changes?: number | undefined;
            status?: string | undefined;
            raw_url?: string | undefined;
            blob_url?: string | undefined;
            patch?: string | undefined;
            sha?: string | undefined;
            contents_url?: string | undefined;
            previous_filename?: string | undefined;
        }[] | undefined;
    };
    merge_base_commit: {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            committer: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            message: string;
            comment_count: number;
            tree: {
                sha: string;
                url: string;
            };
            verification?: {
                verified: boolean;
                reason: string;
                payload: string | null;
                signature: string | null;
            } | undefined;
        };
        author: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        committer: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        parents: {
            sha: string;
            url: string;
            html_url?: string | undefined;
        }[];
        stats?: {
            additions?: number | undefined;
            deletions?: number | undefined;
            total?: number | undefined;
        } | undefined;
        files?: {
            filename?: string | undefined;
            additions?: number | undefined;
            deletions?: number | undefined;
            changes?: number | undefined;
            status?: string | undefined;
            raw_url?: string | undefined;
            blob_url?: string | undefined;
            patch?: string | undefined;
            sha?: string | undefined;
            contents_url?: string | undefined;
            previous_filename?: string | undefined;
        }[] | undefined;
    };
    status: "diverged" | "ahead" | "behind" | "identical";
    ahead_by: number;
    behind_by: number;
    total_commits: number;
    commits: {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            committer: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            message: string;
            comment_count: number;
            tree: {
                sha: string;
                url: string;
            };
            verification?: {
                verified: boolean;
                reason: string;
                payload: string | null;
                signature: string | null;
            } | undefined;
        };
        author: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        committer: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        parents: {
            sha: string;
            url: string;
            html_url?: string | undefined;
        }[];
        stats?: {
            additions?: number | undefined;
            deletions?: number | undefined;
            total?: number | undefined;
        } | undefined;
        files?: {
            filename?: string | undefined;
            additions?: number | undefined;
            deletions?: number | undefined;
            changes?: number | undefined;
            status?: string | undefined;
            raw_url?: string | undefined;
            blob_url?: string | undefined;
            patch?: string | undefined;
            sha?: string | undefined;
            contents_url?: string | undefined;
            previous_filename?: string | undefined;
        }[] | undefined;
    }[];
    files?: {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number;
        deletions: number;
        changes: number;
        blob_url: string;
        raw_url: string;
        contents_url: string;
        patch?: string | undefined;
        previous_filename?: string | undefined;
    }[] | undefined;
}, 200>>;
export {};
