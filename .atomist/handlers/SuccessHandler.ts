import {
    Parameter, ParseJson, ResponseHandler, Tags,
} from "@atomist/rug/operations/Decorators";

import {
    ChannelAddress, DirectedMessage, EventPlan, HandlerContext,
    HandleResponse, Response, ResponseMessage,
} from "@atomist/rug/operations/Handlers";

@ResponseHandler("GenericSuccessHandler", "displays a success message in chat")
@Tags("success")
class GenericSuccessHandler implements HandleResponse<any> {

    @Parameter({ description: "Success msg", pattern: "@any" })
    public msg: string;

    public handle( @ParseJson response: Response<any>): EventPlan {
        const rand = new ChannelAddress("#random");
        const result = `${this.msg}: ${response.body.status}`;
        return new EventPlan().add(new DirectedMessage(result, rand));
    }
}
