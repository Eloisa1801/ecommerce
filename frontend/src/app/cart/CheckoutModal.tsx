import { API_URL } from "@/constans";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Descriptions, message, notification } from "antd";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OJmbyGiE4KIK7Vait5OAeQBkrO3PEiRYDli5ucSEYbnBXrjdMjRi5bEEAwFG3PuIKIESyhQVxv9vDj0tCjtavuw00T9E7NYsO');

interface CheckoutModalProps {
    showChechoutModal: boolean;
    setShowCheckoutModal: any;
    total: number
}
function CkeckoutModal({
    showChechoutModal,
    setShowCheckoutModal,
    total
}: CheckoutModalProps) {
    const [loading, setloading] = useState(false);
    const [clientSecrete, setClientSecrete] = useState('');

    const loadClientSecrete = async () => {
        try {
            setloading(true);
            const { data } = await axios.post(`${API_URL}/payment`, {
                amount: total,
                currency: 'usd',
            });
            setClientSecrete(data);
        } catch (error: any) {
            notification.error({
                message: 'Error on loadClient',
                description: error.message,

            });
        } finally {

        }
    }

    useEffect(() => {
        loadClientSecrete();
    }, []);

    return (
        <Modal
            title={
                <div className="flex justify-between items-center font-bold text-xl">
                    <span>Checkout</span>
                    <span>Total: ${total}</span>
                </div>
            }
            open={showChechoutModal}
            onCancel={() => setShowCheckoutModal(false)}
            centered
            closable={false}
            footer={false}
        >
            <hr className="my-5" />
            <div className="mt-5">
                {stripePromise && clientSecrete && (
                    <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: clientSecrete }}
                    >
                        <CheckoutForm
                            total={total}
                            setShowCheckoutModal={setShowCheckoutModal}
                        />
                    </Elements>
                )}
            </div>
        </Modal>
    )
}
export default CkeckoutModal