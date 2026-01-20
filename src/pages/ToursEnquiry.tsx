import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import Swal from "sweetalert2";

const TourEnquiry = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tour = state?.tour;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================
     HANDLE INVALID ACCESS
  ======================== */
  useEffect(() => {
    if (!tour) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Access",
        text: "Tour information not found.",
        confirmButtonColor: "#E53C42"
      }).then(() => {
        navigate(-1);
      });
    }
  }, [tour, navigate]);

  /* =======================
     INPUT HANDLER
  ======================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* =======================
     VALIDATION
  ======================== */
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  /* =======================
     SUBMIT HANDLER
  ======================== */
  const submitEnquiry = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      await Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all required fields correctly",
        confirmButtonColor: "#E53C42"
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      tour_id: tour?.id || "",
      tour_code: tour?.code || "",
      tour_title: tour?.title || "",
      ...form
    };

    try {
      const res = await fetch(`${BASE_URL}/api/tour-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Enquiry Submitted Successfully!",
          text: "Our travel expert will contact you shortly.",
          confirmButtonColor: "#E53C42"
        });
        navigate(-1);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message || "Please try again later.",
          confirmButtonColor: "#E53C42"
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect. Please check your internet connection.",
        confirmButtonColor: "#E53C42"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================
     UI
  ======================== */
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tour Enquiry
            </h1>

            {tour && (
              <div className="inline-block bg-red-50 border-l-4 border-[#E53C42] p-4 mb-6 rounded">
                <p className="text-gray-700 font-medium">
                  Enquiry for:{" "}
                  <span className="text-[#E53C42]">{tour.title}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tour Code: {tour.code}
                </p>
              </div>
            )}

            <p className="text-gray-600 max-w-lg mx-auto">
              Fill out the form below and our travel expert will get back to you within 24 hours.
            </p>
          </div>

          <form
            onSubmit={submitEnquiry}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <div className="space-y-6">

              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label>Message *</Label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#E53C42] to-red-600 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TourEnquiry;