import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const {
		cart: { shippingAddress, paymentMethod },
	} = state;

	const [paymentMethodName, setPaymentMethod] = useState(
		paymentMethod || 'PayPal'
	);

	useEffect(() => {
		if (!shippingAddress.address) {
			navigate('/shipping');
		}
	}, [shippingAddress, navigate]);


	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({
			type: 'SAVE_PAYMENT_METHOD',
			payload: paymentMethodName
		});
		localStorage.setItem('paymentMethod', paymentMethodName);
		navigate('/placeOrder');
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<div className="container small-container">
				<Helmet>
					<title>Payment method</title>
				</Helmet>
				<h1 className="my-3">Payment method</h1>
				<Form onSubmit={submitHandler}>
					<div className="mb-3">
						<Form.Check
							type="radio"
							id="PayPal"
							label="PayPal"
							value="PayPal"
							checked={paymentMethodName === 'PayPal'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Form.Check
							type="radio"
							id="Stripe"
							label="Stripe"
							value="Stripe"
							checked={paymentMethodName === 'Stripe'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Button type="submit">Continue</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}