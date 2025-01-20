import React, {use} from "react";
import PaymentFailurePage from "../../pages/PaymentFailurePage";

export default function PaymentFailure({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);

    return <PaymentFailurePage itemId={id}/>;
}