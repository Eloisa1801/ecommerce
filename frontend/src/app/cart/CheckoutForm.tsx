'use Client'
import { CartState, ClearCart } from "@/redux/cartSlice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function CheckoutForm({
    total,
    setShowCheckoutModal,
}: {
    total: number;
    setShowCheckoutModal: any;
}) {
    const [loading, setloading] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const { cartItems }: CartState = useSelector((state: any) => state.cart);
    const dispatch = useDispatch()
    const handleSubmit = async (event: any) => {
        try {
            setloading(true)
            event.preventDefault();
            if (!stripe || !elements)
                throw new Error("Stripe.js hasn't loaded yet.")

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/cart',
                },
                redirect: 'if_required'
            });
            if (result.error) {
                throw result.error
            }
            notification.success({
                message: "Payment succssful",
                description: "Your payment was processed successfully"
            })

            const orderPayload = {
                items: cartItems,
                paymentStatus: "paid",
                orderStatus: "order placed",
                shippingAddress: result.paymentIntent.shipping,
                transationId: result.paymentIntent.id,
                total
            }
            //save order data to backend
            // não esquecer de atualizar estoque
            dispatch(ClearCart())
            notification.success({
                message: "order placed succssful",
                description: "Your order was placed successfully"
            })

        } catch (error: any) {
            notification.error
        } finally {
            setloading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="h-[350px overflow-y-scroll pr-5">
                    <PaymentElement />
                    <AddressElement
                        options={{
                            allowedCountries: ['US, BR'],
                            mode: 'shipping'
                        }}
                    />
                </div>
                <div className="flex gap-5">
                    <Button
                        htmlType="button"
                        className="mt-5"
                        block
                        onClick={() => setShowCheckoutModal(false)}
                    ></Button>
                    <Button>Pay</Button>
                </div>
            </form >
        </div >
    )
}

