import { Commit } from "@atomist/cortex/Commit";
import { Repo } from "@atomist/cortex/Repo";
import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import {
    DirectedMessage, EventPlan, HandleEvent, UserAddress,
} from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";

@EventHandler("NewCommitPushedToDMMod", "sends a DM on new commit pushed",
    `/Commit()
        [/author::GitHubId()[@login="fauxryan"]]
        [/repo::Repo()]`)
@Tags("commit", "push")
export class NewCommitPushedToDM implements HandleEvent<Commit, Commit> {
    public handle(event: Match<Commit, Commit>): EventPlan {
        const commit: Commit = event.root;
        const repo: Repo = commit.repo;
        const url: string = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;

        const message = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new UserAddress("@jrday"));

        return EventPlan.ofMessage(message);
    }
}
export const newCommitPushedToDM = new NewCommitPushedToDM();
