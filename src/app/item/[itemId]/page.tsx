import React from "react";
import ItemView from "@/app/pages/ItemViewPage";

type Props = {
    itemId: string;
    sellerId: string;
};

const page = ({ itemId = "1", sellerId = "user1" }: Props) => {
    return <ItemView /*itemId={itemId} sellerId={sellerId}*/ />;
};

export default page;
