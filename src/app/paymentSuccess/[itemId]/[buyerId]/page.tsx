import React, {use} from "react";
import PaymentSuccessPage from "../../../pages/PaymentSuccessPage";

type paymentProp = {
    params: {
        itemId: string;
        buyerId: string;
    };
};

export default function PaymentSuccess({params}: Promise<paymentProp>) {
    const {itemId, buyerId} = use(params);
    return <PaymentSuccessPage itemId={itemId} buyerId={buyerId}></PaymentSuccessPage>;
}
