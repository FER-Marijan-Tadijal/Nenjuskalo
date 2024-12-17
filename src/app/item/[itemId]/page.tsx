import React from "react";
import ItemView from "@/app/pages/ItemViewPage";

const page = (itemId: string) => {
    return <ItemView itemId={itemId} />;
};

export default page;
