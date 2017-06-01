import { Issue } from "@atomist/cortex/Issue";
import {
    CommandHandler, Intent, MappedParameter, Parameter, Secrets, Tags,
} from "@atomist/rug/operations/Decorators";
import {
    CommandPlan, CommandRespondable, Execute, HandleCommand, HandlerContext,
    MappedParameters,
} from "@atomist/rug/operations/Handlers";
import { handleErrors } from "@atomist/rugs/operations/CommonHandlers";

@CommandHandler("CreateGitHubIssue", "Create an issue on GitHub")
@Tags("github", "issues")
@Secrets("github://user_token?scopes=repo")
@Intent("create issue")
class CreateIssueCommand implements HandleCommand {

    @Parameter({ description: "The issue title", pattern: "^.*$" })
    public title: string;

    @Parameter({ description: "The issue body", pattern: "^.*(?m)$" })
    public body: string;

    @MappedParameter(MappedParameters.GITHUB_REPOSITORY)
    public repo: string;

    @MappedParameter(MappedParameters.GITHUB_REPO_OWNER)
    public owner: string;

    @MappedParameter("atomist://correlation_id")
    public corrid: string;

    public handle(ctx: HandlerContext): CommandPlan {
        const plan = new CommandPlan();
        const execute: CommandRespondable<Execute> = {
            instruction: {
                kind: "execute",
                name: "create-github-issue",
                parameters: this,
            },
        };
        plan.add(handleErrors(execute, this));
        return plan;
    }
}

export const create = new CreateIssueCommand();
