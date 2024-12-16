import { auth } from "@/app/auth"; // Adjust the path to your `auth` helper
import ProfilePage from "@/app/pages/ProfilePage";

export default async function ProfilePageServer() {
    const session = await auth(); // Fetch session server-side
    return <ProfilePage session={session} />;
}
