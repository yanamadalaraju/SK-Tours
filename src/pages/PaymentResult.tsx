import React, { useEffect, useState } from "react";
import { Container, Card, Alert, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '@/ApiUrls';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PROCESSING");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const merchantOrderId = params.get("orderId");
    const environment = params.get("environment") || "test";

    if (!merchantOrderId) {
      setLoading(false);
      return;
    }

    setOrderId(merchantOrderId);
    checkPhonePeStatus(merchantOrderId, environment);
  }, [location]);

  const checkPhonePeStatus = async (merchantOrderId, environment) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/phonepe/orders`, {
        action: "check-status",
        merchantOrderId,
        environment,
      });

      if (res.data.success) {
        setStatus(res.data.status);
      } else {
        setStatus("FAILED");
      }
    } catch (err) {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = status === "SUCCESS";
  const isFailed = status === "FAILED" || status === "ERROR";
  const isProcessing = status === "PROCESSING" || status === "PENDING";

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <h5 className="mt-3">Checking PhonePe payment status...</h5>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow text-center">
        <Card.Body>
          <Card.Title>PhonePe Payment</Card.Title>

          <Alert
            variant={
              isSuccess ? "success" : isFailed ? "danger" : "warning"
            }
            className="mt-3"
          >
            {isProcessing && "⏳ Payment is processing"}
            {isSuccess && "✅ Payment Successful"}
            {isFailed && "❌ Payment Failed"}

            <hr />

            <p>
              <strong>Order ID:</strong> {orderId}
              <br />
              <strong>Status:</strong> {status}
            </p>

            {isProcessing && (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() =>
                  checkPhonePeStatus(orderId, "test")
                }
              >
                Refresh Status
              </Button>
            )}
          </Alert>

          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/payment-form")}
            >
              Make Another Payment
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentResult;