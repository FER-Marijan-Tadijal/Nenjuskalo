import React from "react";
import PaymentSuccessPage from "../../pages/PaymentSuccessPage";

type paymentProp = {
    params: {
        id: string;
    };
};

export default function PaymentSuccess({ params }: paymentProp) {
    const { id } = params;
    return <PaymentSuccessPage itemId={id}></PaymentSuccessPage>;
}
