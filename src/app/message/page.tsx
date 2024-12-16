import { auth } from "@/app/auth";
import { getListOfConversations } from "@/app/message/utilFunctions";

export default async function Page() {
    const session = await auth();

    if (session == null) {
        return "Please sign in!";
    }
    const userID = session.user?.id || "";

    const users = await getListOfConversations(userID);

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <ul>
                {users.map((user) => (
                    <li key={user?.id}><a href={"/message/" + user?.id}>{user?.name}</a><span></span></li>
                    // NOTE! Link must be <a> to prevent multiple fetch intervals forming
                ))}
            </ul>
        </>
        
    )
}

