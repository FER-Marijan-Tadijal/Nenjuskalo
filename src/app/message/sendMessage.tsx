import { prisma } from "@/prisma"
import { auth } from "@/app/auth";

export default async function SendMessages({ senderid, receiverid }: {senderid: string, receiverid: string}){
    async function sendMyMessage(formData: FormData) {
        "use server"
   
        let content = formData.get('content') as string;
   
        // generate new id and add
        let max_id = await prisma.message.aggregate({
            _max: {
                id: true
            }
        })
        let id = max_id._max.id;
        if (id == null) id = 0;
        else id += 1;

        await prisma.message.create({
            data: {
                id: id,
                content: content,
                senttime: new Date(),
                senderid: senderid,
                receiverid: receiverid,
            }
        })
    }
   
    return (
    <form action={sendMyMessage}>
        <input type="text" required name="content" placeholder="Aa"></input>
        <input type="submit" value="Pošalji"></input>
    </form>
    )
}